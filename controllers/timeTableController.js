const Timetable = require("../models/timetableModal");

const User = require('../models/userModal')

exports.createTimetable = async (req, res) => {
  try {
    const { subject, day, user, period, time, classs, sec } = req.body;
    // const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    const timetable = await Timetable.create({
      subject,
      day,
      user,
      period,
      time,
      classs,
      sec,
    });
    res.status(200).send({
      status: "success",
      message: "Timetable created successfully",
      timetable,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.findByTeacher = async (req, res) => {
  try {
    //    find all the details of the user by user id from the object
    // const timetable = await Timetable.find({ timetableteacher.user: "64277777bbb186513eca11fb"});
    const { id } = req.params;
    if (!req.params.id) {
      res.status(400).send({
        status: "fail",
        message: "Please provide a valid id",
      });
    }

    
    User.findById(id)
      .then((user) => {
        if (!user.role === "admin") {
          res.status(400).send({
            status: "fail",
            message: "Unauthoriez access",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const timetable = await Timetable.find({ user: req.params.id });
    res.status(200).send({
      status: "success",
      message: "Timetable found successfully",
      timetable,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTimetable = async (req, res) => {
  //find the timetable exist or not
  const { id } = req.params;
  try {
    if (!req.params.id) {
      res.status(400).send({
        status: "fail",
        message: "Please provide a valid id",
      });
    }


    // check the user role 

    const id = req.user.id

    

    User.findById(id)
      .then((user) => {
        if (!user.role === "employee") {
          res.status(400).send({
            status: "fail",
            message: "Unauthoriez access",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // find timee table by id that exist or not

    Timetable.findById(id)
      .then((timetable) => {
        if (!timetable) {
          res.status(400).send({
            status: "fail",
            message: "Timetable not found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // update the timetable
    const { subject, day, user, period, time, classs, sec } = req.body;
    const timetable = await Timetable.findByIdAndUpdate(
      id,
      {
        subject,
        day,
        user,
        period,
        time,
        classs,
        sec,
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({
      status: "success",
      message: "Timetable updated successfully",
      timetable,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.seeTimeTable = async (req, res) => {
  const id = req.user.id;
  try {
    const timetable = await Timetable.find({ user: id });

    res.status(200).send({
      status: "success",
      timetable,
    });
  } catch (err) {
    console.log(err);
  }
};
