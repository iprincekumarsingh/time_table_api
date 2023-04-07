const express = require('express');
const router = express.Router();
const { createTimetable, findByTeacher, updateTimetable, seeTimeTable } = require('../controllers/timeTableController');

const auth = require('../middlewares/auth');
const rolecheck = require('../middlewares/rolechecker');

// admin route
router.route('/create').post(auth,rolecheck, createTimetable);
router.route('/teacher/:id').get(auth,rolecheck, findByTeacher);
router.route('/update/:id').put(auth,rolecheck, updateTimetable);



// user route
router.route('/').get(auth, seeTimeTable)



module.exports = router;