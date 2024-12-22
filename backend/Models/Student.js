module.exports = (studentsDB) => {
  const Schema = require('mongoose').Schema;

  let studentSchema = new Schema({
    name: {
      type: String
    },
    email: {
      type: String
    },
    rollno: {
      type: Number
    }
  }, {
    collection: 'students'
  });

  // Use the studentsDB connection
  return studentsDB.model('Student', studentSchema);
};
