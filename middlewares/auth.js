const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

  // req.user = await User.findById(decoded.id)
  req.user = await User.findById(decoded.id)

  next()
};

module.exports = auth;
