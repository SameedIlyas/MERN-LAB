module.exports = (studentsDB) => {
  const express = require('express');
  const studentRoute = express.Router();

  // Load Student model dynamically using studentsDB
  const studentSchema = require('../Models/Student')(studentsDB);

  // CREATE Student
  studentRoute.route('/create-student').post((req, res, next) => {
    studentSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });

  // READ Students
  studentRoute.route('/').get((req, res, next) => {
    studentSchema.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

  // Get Single Student
  studentRoute.route('/edit-student/:id').get((req, res, next) => {
    studentSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

  // UPDATE Student
  studentRoute.route('/update-student/:id').put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }, // Return the updated document
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log('Student updated successfully!');
        }
      }
    );
  });

  // DELETE Student
  studentRoute.route('/delete-student/:id').delete((req, res, next) => {
    studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  });

  return studentRoute;
};
