module.exports = (booksDB) => {
    const express = require('express');
    const bookRoute = express.Router();
  
    // Load Book model dynamically using booksDB
    const bookSchema = require('../Models/Book')(booksDB);
  
    // CREATE Book
    bookRoute.route('/create-book').post((req, res, next) => {
      bookSchema.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log(data);
          res.json(data);
        }
      });
    });
  
    // READ Books
    bookRoute.route('/').get((req, res, next) => {
      bookSchema.find((error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });
  
    // Get Single Book
    bookRoute.route('/edit-book/:id').get((req, res, next) => {
      bookSchema.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });
  
    // UPDATE Book
    bookRoute.route('/update-book/:id').put((req, res, next) => {
      bookSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }, // Return the updated document
        (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
            console.log('Book updated successfully!');
          }
        }
      );
    });
  
    // DELETE Book
    bookRoute.route('/delete-book/:id').delete((req, res, next) => {
      bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data,
          });
        }
      });
    });
  
    return bookRoute;
  };
