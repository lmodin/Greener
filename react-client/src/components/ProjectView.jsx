import React from 'react';
import ProjectDetails from './ProjectDetails.jsx';
import EventList from './EventList.jsx';
import ProjectViewMap from './ProjectViewMap.jsx';

function ProjectView(props) {
  //console.log('Project View props: ', props)
  return (
    <div>
      <div className="project_view">
        <ProjectDetails project={props.project} />
        <EventList project={props.project} viewEvent={props.viewEvent} />
        <button className="styled_button" onClick={((e) => props.viewProjects(e))}>Back to Projects</button>
        <button className="styled_button" onClick={((e) => {props.createEvent(e, props.project)})} >Create New Event</button>
        <button className="styled_button" >See Past Events</button>
      </div>
      <div className="project_view_map">
        <ProjectViewMap project={props.project} />
      </div>
    </div>
  )

}

export default ProjectView;