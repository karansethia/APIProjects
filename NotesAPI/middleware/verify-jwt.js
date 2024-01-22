const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader){
    return res.status(401);
  }
  const token = authHeader.split(' ')[1];
  console.log(`token : ${token}`);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if(err){
        return res.status(403)
      }
      req.email = decoded.email;
      next();
    }
  )

}

module.exports = verifyJwt;