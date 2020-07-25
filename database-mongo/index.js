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
  name: String,
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
  time: Number,
  extras: [String],
  description: String
})

var Event = mongoose.model('Event', eventSchema);
var Project = mongoose.model('Project', projectSchema);

var saveEvent = function(event, callback) {
  Event.create((event), function(err) {
    if (err) {
      callback(err);
    } else {
      callback()
    }
  });
};

var saveProject = function(project, callback) {
  Project.create((project), function(err) {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

var selectAllProjects = function(callback) {
  Project.find({}, function(err, projects) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, projects);
    }
  });
};

var selectEventsByProject = function(project, callback) {
  Event.find({project: project}, function(err, events) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, events);
    }
  });
};



module.exports.selectAllProjects = selectAllProjects;
module.exports.selectEventsByProject = selectEventsByProject;
module.exports.saveEvent = saveEvent;
module.exports.saveProject = saveProject;