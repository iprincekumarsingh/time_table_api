
const Timetable = require("../models/timetableModal");

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
            sec
        });
        res.status(200).send({
            status: "success",
            message: "Timetable created successfully",
            timetable
        });

    } catch (err) {
        console.log(err);
    }
}

exports.findByTeacher = async (req, res) => {
    try {
        //    find all the details of the user by user id from the object
        // const timetable = await Timetable.find({ timetableteacher.user: "64277777bbb186513eca11fb"});
        const { id } = req.params;
        if (!req.params.id) {
            res.status(400).send({
                status: "fail",
                message: "Please provide a valid id"
            });

        }
        const timetable = await Timetable.find({ user: req.params.id });
        res.status(200).send({
            status: "success",
            message: "Timetable found successfully",
            timetable
        });

    } catch (err) {
        console.log(err);
    }
}


exports.teacherUpdateTimeTable = async (req, res) => {

    const { id } = req.params.id;
    if (!id) {
        res.status(400).send({
            status: "fail",
            message: "Select a teacher to update"
        });
    }
    try {

        


        if (!req.params.id) {
            res.status(400).send({
                status: "fail",
                message: "Teacher doesn`t exist"
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}