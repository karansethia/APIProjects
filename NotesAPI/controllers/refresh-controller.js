const asyncWrapper = require("../middleware/async-wrapper");
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const refreshController = asyncWrapper(async(req,res) => {

  const cookies = req.cookies;
  if(!cookies?.jwt){
    return res.status(401);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.find({refreshToken});
  if(!foundUser){
    return res.status(403)
  }  

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err,decoded) => {
      if(err || foundUser.email !== decoded.email){
        return res.status(403)
      }
       const accessToken = jwt.sign(
          {"username":decoded.username},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: '120s'}
          
          );
        res.json({accessToken})
    }
  )

});

module.exports = {refreshController}