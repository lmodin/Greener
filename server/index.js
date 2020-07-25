var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
const cors = require('cors')

var app = express();
app.use(cors())
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/projects', function (req, res) {
  db.selectAllProjects(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/events/:projectName', function (req, res) {
  db.selectEventsByProject(req.params.projectName, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/projects/newProject', function (req, res) {
  let project = req.body
  console.log('got post project: ', project)
  // db.saveEvent(event, function(err, data) {
  //   if(err) {res.sendStatus(500);}
  //   else {res.send(200)}
  // });
})

app.post('/events/newEvent', function (req, res) {
  let event = req.body.event
  console.log('got post event: ', event)
  // db.saveEvent(event, function(err, data) {
  //   if(err) {res.sendStatus(500);}
  //   else {res.send(200)}
  // });
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

