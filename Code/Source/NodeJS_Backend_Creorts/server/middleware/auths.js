const jwt = require('jsonwebtoken');
const User = require('../api/user/user.model');
const logger = require("../middleware/logger");

const auths = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('bearer', '').trim();
    const decoded = jwt.verify(token, "thisismynewblog");
    const user = await User.findOne({ _id: decoded._id});
    if(!user) {
      throw new Error();
    }
     
    req.user = user;
    next();
  } catch(error) {
    logger.info("Authentication API : status : 401 ");
    res.status(401).send({error: 'Please authenticate!'});
  }
};
module.exports = auths;
