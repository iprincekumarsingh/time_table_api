const User = require("../models/userModal");
const bcryptjs = require("bcryptjs");
exports.createAccount = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // check if fields are empty or not

    if (!name || !email || !phone || !password) {
      return res.status(400).send({
        status: "fail",
        message: "Please fill all the fields",
      });
    }

    //  check if email is already registered

    User.findOne({ email }).then((data) => {
      if (data) {
        return res.status(400).send({
          status: "fail",
          message: "Email already registered",
        });
      }
    });

    const user = User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
    });
    const token = await user.generateToken();

    password = undefined;

    return res.status(200).send({
      status: "success",
      message: "Account created successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        status: "fail",
        message: "Please fill all the fields",
      });
    }

    await User.findOne({ email }).then((data) => {
      if (!data) {
        return res.status(401).send({
          status: "fail",
          message: "User does not exist",
        });
      }
    });

    const user = await User.findOne({ email })
      .select("+password")
      .select("+status");

    const isban = user.status === "ban" ? false : true;

    console.log(isban);

    // user is banner functionality
    if (!isban) {
      return res.status(400).send({
        status: "fail",
        message: "You are banned by admin",
      });
    }

    if (!user || !(await user.isValidPassword(password, user.password))) {
      return res.send({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const token = await user.generateToken();

    user.password = undefined;

    return res.status(200).send({
      status: "success",
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.log();
  }
};

exports.teacherTimetable = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(400).send({
        status: "fail",
        message: "Please provide a valid id",
      });
    }
    const timetable = await Timetable.find({ user: req.user.id });
    return res.status(200).send({
      status: "success",
      message: "Timetable found successfully",
      timetable,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).send({
      status: "success",
      message: "User found successfully",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send({
      status: "fail",
      message: "Please fill all the fields",
    });
  }

  // update the user if password is given or not

  const user = await User.findByIdAndUpdate(req.user.id, {
    name,
    email,
    phone,
  });
  return res.status(200).send({
    status: "success",
    message: "User updated successfully",
    user,
  });
};

exports.updatePassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).send({
      status: "fail",
      message: "Please fill all the fields",
    });
  }

  // const hashpassod =  bcrypt.hash(password, 10);
  // update the user if password is given or not

  const hashpasword = await bcryptjs.hash(password, 12);

  const user = await User.findByIdAndUpdate(req.user.id, {
    password: hashpasword,
  });
  return res.status(200).send({
    status: "success",
    message: "Passwor updated successfully",
    user,
  });
};
