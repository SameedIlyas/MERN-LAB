let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

// Connect to mern-crud Database
const studentsDB = mongoose.createConnection('mongodb://127.0.0.1:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

studentsDB.on('connected', () => {
  console.log('Connected to MongoDB: mern-crud');
});

// Connect to lab13 Database
const booksDB = mongoose.createConnection('mongodb://127.0.0.1:27017/lab13', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

booksDB.on('connected', () => {
  console.log('Connected to MongoDB: lab13');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// Import Routes
const studentRoute = require('./routes/student.route')(studentsDB);
const bookRoute = require('./routes/book.route')(booksDB);

// Routes
app.use('/students', studentRoute);
app.use('/books', bookRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
