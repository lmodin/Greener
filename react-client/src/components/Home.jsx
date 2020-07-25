import React from 'react';
import ProjectList from './ProjectList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="home_page">
        <h1>This is the home page</h1>
        <ProjectList
          projects={this.props.projects}
          viewProject={this.props.viewProject}
          viewEvent={this.props.viewEvent}
        />
        <h3>Click on any project to see the details</h3>
        <button className="home_button">Create Project</button>
      </div>
    )
  }
}

export default Home;