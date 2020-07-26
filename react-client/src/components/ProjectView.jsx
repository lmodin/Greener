import React from 'react';
import ProjectDetails from './ProjectDetails.jsx';
import EventList from './EventList.jsx';
import ProjectViewMap from './ProjectViewMap.jsx';

function ProjectView(props) {
  console.log('Project View props: ', props)
  return (
    <div className="project_view">
      <ProjectDetails project={props.project} />
      <EventList project={props.project} viewEvent={props.viewEvent}/>
      <ProjectViewMap project={props.project} />
    </div>
  )

}

export default ProjectView;