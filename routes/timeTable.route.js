const express = require('express');
const router = express.Router();
const { createTimetable, findByTeacher, updateTimetable, deleteTimetable } = require('../controllers/timeTableController');

router.route('/create').post(createTimetable);
router.route('/teacher').get(findByTeacher);


module.exports = router;