import React from 'react';
import ProjectView from './ProjectView.jsx';
import EventView from './EventView.jsx';
import Projects from './Projects.jsx';
import RSVPView from './RSVPView.jsx';
import CreateEvent from './CreateEvent.jsx';
import CreateProject from './CreateProject.jsx';
import NotificationsView from './NotificationsView.jsx'
import Header from './Header.jsx';
import AboutUs from './AboutUs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsInView: false,
      projectInView: null,
      eventInView: null,
      projects: [],
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
    }

    this.fetchProjects = this.fetchProjects.bind(this);
    this.viewEvent = this.viewEvent.bind(this);
    this.viewProject = this.viewProject.bind(this);
    this.viewProjects = this.viewProjects.bind(this);
    this.RSVPtoEvent = this.RSVPtoEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.createProject = this.createProject.bind(this);
    this.notifcationsView = this.notifcationsView.bind(this);
    this.viewAboutUs = this.viewAboutUs.bind(this);
  }

  notifcationsView(e) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: null,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: true,
      aboutUsInView: false
    })
  }
  viewAboutUs(e) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: null,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: true
    })
  }

  viewProject(e, project) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: project,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
    })
    e.preventDefault();
  }

  viewEvent(e, event, project) {
    this.setState({
      projectsInView: false,
      eventInView: event,
      projectInView: project,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
    })
  }

  RSVPtoEvent(e, event, project) {
    //console.log('RSVP got clicked')
    this.setState({
      projectsInView: false,
      eventInView: event,
      RSVPInView: true,
      projectInView: project,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
    })
  }

  createEvent(e, project) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectInView: project,
      RSVPInView: false,
      creatingNewEvent: true,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
    })
  }
  createProject(e) {
    this.setState({
      projectsInView: false,
      eventInView: null,
      projectsInView: null,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: true,
      notificationsInView: false,
      aboutUsInView: false
    })
  }

  viewProjects(e) {
    this.setState({
      projectsInView: true,
      eventInView: null,
      projectInView: null,
      RSVPInView: false,
      creatingNewEvent: false,
      creatingNewProject: false,
      notificationsInView: false,
      aboutUsInView: false
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
            RSVPInView: false,
            creatingNewEvent: false,
            creatingNewProject: false,
            notificationsInView: false,
            aboutUsInView: false
          })
        }
      });
    e.preventDefault();
  }

  render() {
    if (this.state.notificationsInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <NotificationsView
          viewProjects={this.viewProjects}
        />
        </div>
      )
    } else if (this.state.aboutUsInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <AboutUs
          viewProjects={this.fetchProjects}
        />
        </div>
      )
    } else if (this.state.RSVPInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <RSVPView
          event={this.state.eventInView}
          project={this.state.projectInView}
          viewEvent={this.viewEvent}
          viewProject={this.viewProject}
          refreshProjects={this.fetchProjects}
        />
        </div>
      )
    } else if (this.state.creatingNewEvent) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <CreateEvent
          project={this.state.projectInView}
          viewProject={this.viewProject}
          refreshProjects={this.fetchProjects}
          viewEvent={this.viewEvent}
        />
        </div>
      )
    } else if (this.state.creatingNewProject) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <CreateProject
          viewProject={this.viewProject}
          viewProjects={this.viewProjects}
          refreshProjects={this.fetchProjects}
        />
        </div>
      )
    } else if (this.state.eventInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <EventView
          event={this.state.eventInView}
          viewProject={this.viewProject}
          viewProjects={this.viewProjects}
          project={this.state.projectInView}
          RSVPtoEvent={this.RSVPtoEvent}
        />
        </div>
      )
    } else if (this.state.projectInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <ProjectView
          project={this.state.projectInView}
          viewEvent={this.viewEvent}
          viewProjects={this.viewProjects}
          createEvent={this.createEvent}
        />
        </div>
      )
    } else if (this.state.projectsInView) {
      return (
        <div>
        <Header viewAboutUs={this.viewAboutUs}/>
        <Projects
          projects={this.state.projects}
          viewEvent={this.viewEvent}
          viewProject={this.viewProject}
          createProject={this.createProject}
          notifcationsView={this.notifcationsView}
        />
        </div>
      )
    } else {
      return (
        <div>
          <Header viewAboutUs={this.viewAboutUs}/>
          <div className="main_welcome">
            <div id="start_here">Connect with Clean Projects in your Community</div>
            <button className="styled_button" onClick={((e) => { this.fetchProjects(e) })}>Get Started</button>
          </div>
        </div>
      )
    }
  }
}

export default App;