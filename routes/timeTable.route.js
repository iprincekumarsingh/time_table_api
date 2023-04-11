const express = require("express");
const router = express.Router();
const {
  createTimetable,
  findByTeacher,
  updateTimetable,
  seeTimeTable,
  findAllTeachers,
  viewparticularTimetable,
} = require("../controllers/timeTableController");

const auth = require("../middlewares/auth");
const rolecheck = require("../middlewares/rolechecker");

// admin route

router.route("/create").post(auth, rolecheck, createTimetable);
router.route("/teacher/:id").get(auth, rolecheck, findByTeacher);
router.route("/update/:id").put(auth, rolecheck, updateTimetable);
router
  .route("/get/timetable/:id")
  .get(auth, rolecheck, viewparticularTimetable);

// user route
router.route("/timetable").get(auth, seeTimeTable);

// router.route('/timetable').get(auth, findByTeacher);
// fetching all teachers

router.route("/teacher").get(auth, rolecheck, findAllTeachers);

module.exports = router;
