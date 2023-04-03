exports.allUser = (req, res) => {
    // showing all the user
    try {
        User.find().then((user) => {
            res.status(200).send({
                status: "success",
                message: "All the user",
                user
            });
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (err) {

    }
}


// fetching one user by id from Timetable schema
exports.OneUser = (req, res) => {
    try {

        const { id } = req.params
        User.findOne(id).then((user) => {
            res.status(200).send({
                status: "success",
                message: "One user",
                user
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (err) {

    }
}

exports.banUser = (req, res) => {
    // banning the user
    try {
        if (res.params.id) {
            User.findByIdAndUpdate(res.params.id, { status: 'banned' }).then((user) => {
                res.status(200).send({
                    status: "success",
                    message: "User banned",
                    user
                })
            }).catch((err) => {
                console.log(err);
                return res.status(500).send({
                    status: "error",
                    message: "User not banned"
            })
        })
        }

    } catch (err) {     
        console.log('error');
    }
}