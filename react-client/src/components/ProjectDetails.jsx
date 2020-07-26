import React from 'react';


function ProjectDetails (props) {
  return (
    <div className="project_view_details">
      <div className="project_view_details_name">
        {props.project.name}
      </div>
      <div className="project_view_details_owner">
        This project is owned by {props.project.owner}
      </div>
      <div className="project_view_details_description">
        {props.project.description}
      </div>
    </div>
  )
}


export default ProjectDetails;