const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const rolecheck = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

  req.user = await User.findById(decoded.id)

  // check the user role
  if (req.user.role != "admin") {
    return res.status(400).send({
      status: "fail",
      message: "Unauthoriez access",
    });
  }

  next()
};

module.exports = rolecheck;
