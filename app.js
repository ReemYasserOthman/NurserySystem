const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const childRoute = require("./Routes/childRoute");
const teacherRoute = require("./Routes/teacherRoute");
const classRoute = require("./Routes/classRoute");
const athenticationRoute = require("./Routes/athenticationRoute");
const autorizationMW = require("./Core/Authorization/authorization");
require("dotenv").config();


//1- open server
const server = express();
const port = process.env.PORT || 8080; //in Hosting only

//Connect DB
mongoose.set("strictQuery",true);
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB is Connected.");
    server.listen(port, () => {
        console.log("server is listening from express", port);
      });
  })
  .catch((error) => {
    console.log("DB Error " + error);
  });

//2- listen port
// server.listen(port, () => {
//   console.log("server is listening from express", port);
// });

//3-MiddelWares
// First Middelware   Logging => Url & Method
server.use(morgan("tiny"));

//End Points
server.use(express.json());
server.use(athenticationRoute);
server.use(autorizationMW);
server.use(childRoute);
server.use(teacherRoute);
server.use(classRoute);

//Not found Middelware
server.use((request, response, next) => {
  response.status(404).json({ message: "Page not found!" });
});

//Error Middelware =>
server.use((error, request, response, next) => {
  let status= error.status || 500;
  response.status(status).json({ message: error + "" });
});
