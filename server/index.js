var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
const Cors = require('cors');
const Promise = require('bluebird');

var app = express();
app.use(Cors())
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

Promise.promisifyAll(require('mongoose'));

//Get all projects
app.get('/projects', function (req, res) {
  db.selectAllProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      console.log('Error getting all projects: ', err)
      res.sendStatus(500);
    })
});

//get all events with specific project name
app.get('/events/:projectName', function (req, res) {
  let project = req.params.projectName.split('_').join(' ');
  db.selectEventsByProject(project)
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.log('Error getting events by project name: ', err)
      res.sendState(500);
    })

});

//Create a new project
app.post('/projects/newProject', function (req, res) {
  let project = req.body;
  console.log('got post project: ', project);
  db.saveProject(project)
    .then(res.send(200))
    .catch((err) => {
      console.log('Error saving new project: ', err);
      res.sendStatus(500);
    })
})

//create a new event
app.post('/events/newEvent', function (req, res) {
  let event = req.body
  console.log('got post event: ', event)
  db.saveEvent(event)
    .then(res.send(200))
    .catch((err) => {
      console.log('Error saving new event: ', err);
      res.sendStatus(500);
    })
})

//Add name, people attending to event based on RSVP
app.post('/RSVP', function(req, res) {
  //console.log('Got an RSVP request for people: ', req.body)
  db.rsvp(req.body)
    .then(res.send(200))
    .catch((err) => {
      console.log('Error saving RSVP: ', err);
      res.sendStatus(500);
    })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

