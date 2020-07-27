import React from 'react';
import ProjectList from './ProjectList.jsx';

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="projects_page">
        <div className="projects_page_left">
        <h1>Current Projects</h1>
        <h3>Select any project to see the details</h3>
        <ProjectList
          projects={this.props.projects}
          viewProject={this.props.viewProject}
          viewEvent={this.props.viewEvent}
        />
        <button className="projects_button">Create Project</button>
        </div>
        <div className="projects_page_right">
          Map will go here
        </div>
      </div>
    )
  }
}

export default Projects;