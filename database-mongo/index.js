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
  name: String,
  peopleRequested: Number,
  peopleRSVPd: Number,
  date: Date,
  extras: [String],
  description: String
})

var Event = mongoose.model('Event', eventSchema);
var Project = mongoose.model('Project', projectSchema);

var saveEvent = function(event) {
  var event = Event.create(event);
  return event;
  // Event.create((event), function(err) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback()
  //   }
  // });
};

var saveProject = function(project) {
  var project = Project.create(project);
  return project;
  // Project.create((project), function(err) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback();
  //   }
  // });
};

var selectAllProjects = function() {
  var projects = Project.find().lean();
  return projects;
  // Project.find({}, function(err, projects) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, projects);
  //   }
  // });
};

var selectEventsByProject = function(project) {
  var events = Event.find({project: project});
  events.sort({date: 'asc'});
  return events;
  // Event.find({project: project}, function(err, events) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, events);
  //   }
  //   //add a sort functionality to sort by date,
  // });
};


module.exports = {
  selectAllProjects: selectAllProjects,
  selectEventsByProject: selectEventsByProject,
  saveEvent: saveEvent,
  saveProject: saveProject,
}