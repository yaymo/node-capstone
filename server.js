const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const passport = require('passport');

const {showRoutes} = require('./app/showRoutes');
const {router} = require('./app/routes');


const {User} = require('./app/models/user');
const {Show} = require('./app/models/show');
const {DATABASE_URL, PORT} = require('./config/database');

app.use(morgan('common'));
app.use(jsonParser);
app.use(express.static('public'));
app.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

app.use('/user', router);
app.use('/shows', showRoutes);


let server;
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
