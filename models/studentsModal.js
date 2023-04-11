const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    subjectTeacher: {
  },
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  period: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  classs: {
    type: String,
    required: true,
  },
  sec: {
    type: String,
  },
});
