import React from 'react';
import ProjectView from './ProjectView.jsx';
import EventView from './EventView.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInView: null,
      eventInView: null,
      projects: []
    }
    this.viewEvent = this.viewEvent.bind(this);
    this.viewProject = this.viewProject.bind(this);
  }

  viewProject(e, project) {
    this.setState({
      eventInView: null,
      projectInView: project
    })
  }

  viewEvent(e, event) {
    this.setState({
      eventInView: event,
      projectInView: null
    })
  }
  componentDidMount() {
    $.ajax({
      url: `/projects`,
      success: (data) => {
        this.setState({
          projects: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    if (this.state.eventInView) {
      return (
        <div>
          <EventView
            event={this.state.eventInView}
            viewProject={this.viewProject}
          />
        </div>
      )
    } else if (this.state.projectInView) {
      return (
        <div>
          <ProjectView
            project={this.state.projectInView}
            viewEvent={this.viewEvent}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Home
            projects={this.state.projects}
            viewEvent={this.viewEvent}
            viewProject={this.viewProject}
          />
        </div>
      )
    }
  }
}

export default App;