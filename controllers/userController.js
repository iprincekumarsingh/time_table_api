const User = require("../models/userModal");
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

    User.findOne({ email, phone }).then((data) => {
      if (data) {
        return res.status(400).json({
          status: "fail",
          message: "User already exist",
        });
      }
    });

    const user = await User.create({ name, email: email.toLowerCase(), phone, password });
    const token = await user.generateToken();

    this.password = undefined;

    res.status(200).send({
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
      return res.status(400).send({
        status: "fail",
        message: "Please fill all the fields"
      })
    }



    await User.findOne({ email: email.toLowerCase() }).then((data) => {
      if (!data) {
        return res.status(400).send({
          status: "fail",
          message: "User does not exist"
        })
      }
    })


    // await User.findOne({ status: "ban" }).then((data) => {
    //   if (data) {
    //     return res.status(400).send({
    //       status: "fail",
    //       message: "You are banned by admin"
    //     })
    //   }


    const user = await User.findOne({ email: email.toLowerCase() }).select("+password").select("+status");


    const isban = user.status === "ban" ? false : true;

    console.log(isban);


    // user is banner functionality
    if (!isban) {
      return res.status(400).send({
        status: "fail",
        message: "You are banned by admin"
      })
    }

    if (!user || !(await user.isValidPassword(password, user.password))) {

      return res.status(400).send({
        status: "fail",
        message: "Invalid credentials"
      })
    }

    const token = await user.generateToken();



    user.password = undefined;

    res.status(200).json({
      status: "success",
      message: "Login successful",
      user,
      token
    })
  }
  catch (err) {
    console.log();
  }

}

exports.teacherTimetable = async (req, res) => {
  try {


    const id = req.user.id
    if (!id) {
      res.status(400).send({
        status: "fail",
        message: "Please provide a valid id"
      });

    }
    const timetable = await Timetable.find({ user: req.user.id });
    res.status(200).send({
      status: "success",
      message: "Timetable found successfully",
      timetable
    });

  } catch (err) {
    console.log(err);
  }

}