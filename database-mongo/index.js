var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clean');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var projectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  owner: String,
  status: String,
  type: String,
  description: String
});

var eventSchema = mongoose.Schema({
  project: String,
  name: {
    type: String,
    unique: true,
  },
  peopleRequested: Number,
  peopleRSVPd: Number,
  attendees: [String],
  date: Date,
  extras: [String],
  description: String
})

var Event = mongoose.model('Event', eventSchema);
var Project = mongoose.model('Project', projectSchema);

var saveEvent = function(event) {
  var event = Event.create(event);
  return event;
};

var saveProject = function(project) {
  var project = Project.create(project);
  return project;
};

var selectAllProjects = function() {
  var projects = Project.find().lean();
  return projects;
};

var rsvp = function(rsvp) {
  let event = Event.findByIdAndUpdate(rsvp.event, {
    $push: {attendees: rsvp.name},
    $inc: {peopleRSVPd: rsvp.people}
  });
  return event;
}
var selectEventsByProject = function(project) {
  var events = Event.find({project: project});
  events.sort({date: 'asc'});
  return events;
};


module.exports = {
  selectAllProjects: selectAllProjects,
  selectEventsByProject: selectEventsByProject,
  saveEvent: saveEvent,
  saveProject: saveProject,
  rsvp: rsvp
}