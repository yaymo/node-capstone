const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Show} = require('./models/show');

const showRoutes = express.Router();

showRoutes.use(jsonParser);

showRoutes.get('/', passport.authenticate('basic', {session: false}), (req, res) => {
  Show.find({ user: req.user._id})
    .then(shows => {
    res.json(shows);
  });
});

showRoutes.get('/:id', (req, res) => {
  Show.findById(req.params.id)
    .then(shows => {
    res.json(shows)
  });
});


showRoutes.post('/', passport.authenticate('basic', {session: false}), jsonParser, (req, res) => {
  //console.log(req);

  const reqFields = ['title'];
  for(let i=0; i<reqFields.length; i++) {
    const field = reqFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in req body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  req.body.user = req.user._id
  console.log(req.body);


  const item = Show.create(req.body);
  res.status(201).json(item);
})

showRoutes.put('/:id', (req, res) => {
  const reqFields = ['name', '_id'];
  for(let i=0; i<reqFields.length; i++) {
    const field = reqFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in req body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if(req.params.id !== req.body._id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`
    console.error(message);
    return res.status(400).send(message);
  }

  Show.update({ _id: req.params.id }, { $set: req.body}, function(data) {
      console.log(data);
      res.sendStatus(204);
  });
});



showRoutes.delete('/:id', passport.authenticate('basic', {session: false}), (req, res) => {
  Show.findOneAndRemove({
    _id: req.params.id},
    function() {
      res.sendStatus(204);
    });
});

module.exports = {showRoutes};

