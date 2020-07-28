import React from 'react';
import ProjectList from './ProjectList.jsx';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import map from '../../../keys.js';

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          <button className="styled_button" onClick={((e) => { this.props.createProject(e) })}>Create Project</button>
          <button className="styled_button" onClick={((e) => { this.props.notifcationsView(e) })}>Get Notifications</button>
        </div>
        <div className="projects_page_right">
          <Map
            google={this.props.google}
            zoom={8}
            style={{ width: '500px', height: '400px', textAlign: 'center'}}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          />
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: map.map
})(Projects);