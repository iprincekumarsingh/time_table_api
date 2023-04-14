const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
var morgan = require("morgan");
var bodyParser = require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const whitelist = ["http://localhost:3000", "http://127.0.0.1:3000","https://timetable-api-zeta.vercel.app/"]
// const corsOptions = {
//   origin: function (origin, callback) {

//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// morgan('tiny')
app.use(morgan("tiny"));
const home = require("./routes/home.route");

// importing routes from routes folder
const user = require("./routes/user");

// timeTable = require('./routes/timeTable.route')
const timeTable = require("./routes/timeTable.route");

app.use("/api/v1/timetable", timeTable);

app.use("/", home);
app.use("/api/v1/auth", user);
module.exports = app;
