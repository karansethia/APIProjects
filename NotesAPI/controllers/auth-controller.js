const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncWrapper = require('../middleware/async-wrapper');
const User = require('../models/user');
require('dotenv').config();

const registerController = asyncWrapper(async(req,res)=> {
  const { name, email, password } = req.body;

  console.log(req.body);

  //* check if all details are present 
  if(!email || !name || !password){
    return res.status(400).json({"message": "Details missing"});
  }

  //* check for duplicate user
  const duplicate = await User.find({email: email})
  console.log(duplicate);
  if(duplicate.length != 0){
    console.log("no duplicate found");
    return res.status(409).json({"message": "User already exists"});
  }

  //* create new user and tokens and also hash pwd
  try {
    const hashedPwd = await bcrypt.hash(password,10);
    const newUser = {"name": name, "email": email, "password": hashedPwd}
    await User.create(newUser);
    return res.status(201).json({"message": "User created"});
  } catch (error) {
    return res.status(500).json({"message": "An error occured"});
  }

})
const loginController = asyncWrapper(async(req,res)=> {
  const { email, password } = req.body;
  console.log(req.body);
  if(!email || !password){
    return res.status(400).json({"message": "Email or Password not found"});
  }
  const foundUser = await User.findOne({email: email});
  console.log(foundUser);
  if(!foundUser){
    return res.status(401).json({"message": "User not found"});
  }
  const match = await bcrypt.compare(password, foundUser.password);
  console.log(match);

  if(match){
    const accessToken = jwt.sign(
      {"email": foundUser.email},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '120s'}
    );
    const refreshToken = jwt.sign(
      {"email": foundUser.email},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1000s'}
    );

    await User.findByIdAndUpdate({_id: foundUser._id},{refreshToken})

    res.cookie('jwt', refreshToken, {httpOnly: true})
    return res.status(200).json({accessToken})
  }else{
    return res.status(401).json({"message": "Email or Password incorrect"})
  }
});

module.exports = {registerController, loginController}