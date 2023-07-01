const mongoose = require("mongoose");
require("./../Models/teacherModel");

const teacherSchema = mongoose.model("teachers");

module.exports.getAllTeachers = (request, response, next) => {
  teacherSchema
    .find({})
    .then((data) => {
      if (data == null) {
        throw new Error("NO Teacher!!");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addTeacher = (request, response, next) => {
  let teacherObject = new teacherSchema({
    _id:request.body.id,
    fullName: request.body.fullName,
    password: request.body.password,
    email: request.body.email,
    image: request.body.image,
  });
  teacherObject.save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTeacher = (request, response, next) => {
  teacherSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data: "Teacher deleted!!" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateTeacher = (request, response, next) => {
  teacherSchema
    .updateOne(
      { _id: request.body.id },
      {
        $set: {
          _id: request.body.id,
          fullName: request.body.fullName,
          password: request.body.password,
          email: request.body.email,
          image: request.body.image,
        },
      }
    )
    .then((data) => {
      response.status(200).json({ data: "Updated." });
    })
    .catch((error) => {
      next(error);
    });
};
