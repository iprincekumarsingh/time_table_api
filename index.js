const app = require("./app");

// importing dotenv
require("dotenv").config();
// db connection import
const dbConn = require("./config/dbConn");

// db connection
dbConn();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
