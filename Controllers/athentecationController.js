const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const childSchema = mongoose.model("children");
const teacherSchema = mongoose.model("teachers");

module.exports.login = (request, response, next) => {
  //admin
  if (request.body.userName == "reem" && request.body.password == "12345") {
    let token = jwt.sign(
      {
        role: "admin",
        id: 1,
        userName: "reem",
      },
      process.env.SECRETKEY,{ expiresIn: "1h" }
    );

    response.status(200).json({ data: "login as admin!", token });
    //console.log(token);
  } else {
    //teacher
    teacherSchema.findOne({ fullName: request.body.fullName,password:request.body.password })
      .then((data) => {
        if (data == null) {
          let error = new Error("");
          error.status = 403;
          throw error;
        } else {
          let token = jwt.sign(
            {
              role: "teacher",
              id: data.id,
              fullName: data.fullName
            },
            process.env.SECRETKEY,{ expiresIn: "1h" }
          );
          response.status(200).json({ data: "login as teacher!", token });
        }
      })
      .catch((error) => {
        error = new Error("Not Athentacited!");
        error.status = 401;
        next(error);
      });
  }
};
