const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const fs = require("fs");

const { PORT, MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

app.use(bodyParser.json());

const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

fs.access("./uploads", function(error) {
  if (error) {
    console.log("Creating uploads directory");
    fs.mkdir("./uploads", function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("uploads directory successfully created.")
      }
    })
  } else {
    console.log("Upload Directory Exists")
  }
})

app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/invoice', require('./routes/api/v1/invoice'));
app.use('/api/v1/files', require('./routes/api/v1/files'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

