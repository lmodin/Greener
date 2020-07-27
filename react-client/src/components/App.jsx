import React from 'react';
import ProjectView from './ProjectView.jsx';
import EventView from './EventView.jsx';
import Projects from './Projects.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsInView: false,
      projectInView: null,
      eventInView: null,
      projects: []
    }
    this.viewEvent = this.viewEvent.bind(this);
    this.viewProject = this.viewProject.bind(this);
    this.viewProjects = this.viewProjects.bind(this);
  }

  viewProject(e, project) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: project
    })
    e.preventDefault();
  }

  viewEvent(e, event) {
    this.setState({
      projectsInView: false,
      eventInView: event,
      projectInView: null
    })
  }

  viewProjects(e) {
    this.setState({
      projectsInView: true,
      eventInView: null,
      projectInView: null
    })
  }
  fetchProjects(e) {
    fetch('/projects')
      .then(response => response.json())
      .then(data => {
        this.setState({
          projects: data,
          projectsInView: true
        })
      });
      e.preventDefault();
  }

  render() {
    if (this.state.eventInView) {
      return (
        <div>
          <EventView
            event={this.state.eventInView}
            viewProject={this.viewProject}
            viewProjects={this.viewProjects}
          />
        </div>
      )
    } else if (this.state.projectInView) {
      return (
        <div>
          <ProjectView
            project={this.state.projectInView}
            viewEvent={this.viewEvent}
            viewProjects={this.viewProjects}
          />
        </div>
      )
    } else if (this.state.projectsInView) {
      return (
        <div>
          <Projects
            projects={this.state.projects}
            viewEvent={this.viewEvent}
            viewProject={this.viewProject}
          />
        </div>
      )
    } else {
      return (
        <div className="main_welcome">
          <div id="start_here">Connect with Clean Projects in your Community</div>
          <button className="main_button" onClick={((e) => {this.fetchProjects(e)})}>Get Started</button>
        </div>
      )
    }
  }
}

export default App;