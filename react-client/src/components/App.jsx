import React from 'react';
import ProjectView from './ProjectView.jsx';
import EventView from './EventView.jsx';
import Projects from './Projects.jsx';
import RSVPView from './RSVPView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsInView: false,
      projectInView: null,
      eventInView: null,
      projects: [],
      RSVPInView: false
    }

    this.fetchProjects = this.fetchProjects.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
    this.viewProject = this.viewProject.bind(this);
    this.viewProjects = this.viewProjects.bind(this);
    this.RSVPtoEvent = this.RSVPtoEvent.bind(this);
  }

  viewProject(e, project) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: project,
      RSVPInView: false
    })
    e.preventDefault();
  }

  viewEvent(e, event, project) {
    this.setState({
      projectsInView: false,
      eventInView: event,
      projectInView: project,
      RSVPInView: false
    })
  }

  RSVPtoEvent(e, event, project) {
    //console.log('RSVP got clicked')
    this.setState({
      projectsInView: false,
      eventInView: event,
      RSVPInView: true,
      projectInView: project
    })
  }

  viewProjects(e) {
    this.setState({
      projectsInView: true,
      eventInView: null,
      projectInView: null,
      RSVPInView: false
    })
  }

  fetchProjects(e, project) {
    fetch('/projects')
      .then(response => response.json())
      .then(data => {
        if (project) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].name === project.name) {
              project = data[i]
            }
          }
          this.viewProject(e, project);
        } else {
          this.setState({
            projects: data,
            projectsInView: true,
            eventInView: null,
            projectInView: null,
            RSVPInView: false
          })
        }
      });
    e.preventDefault();
  }

  render() {
    if (this.state.RSVPInView) {
      return (
        <RSVPView
          event={this.state.eventInView}
          project={this.state.projectInView}
          viewEvent={this.viewEvent}
          viewProject={this.viewProject}
          refreshProjects={this.fetchProjects}
        />
      )
    }
    else if (this.state.eventInView) {
      return (
        <EventView
          event={this.state.eventInView}
          viewProject={this.viewProject}
          viewProjects={this.viewProjects}
          project={this.state.projectInView}
          RSVPtoEvent={this.RSVPtoEvent}
        />
      )
    } else if (this.state.projectInView) {
      return (

        <ProjectView
          project={this.state.projectInView}
          viewEvent={this.viewEvent}
          viewProjects={this.viewProjects}
        />

      )
    } else if (this.state.projectsInView) {
      return (
        <Projects
          projects={this.state.projects}
          viewEvent={this.viewEvent}
          viewProject={this.viewProject}
        />
      )
    } else {
      return (
        <div className="main_welcome">
          <div id="start_here">Connect with Clean Projects in your Community</div>
          <button className="main_button" onClick={((e) => { this.fetchProjects(e) })}>Get Started</button>
        </div>
      )
    }
  }
}

export default App;