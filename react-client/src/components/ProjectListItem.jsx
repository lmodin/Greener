import React from 'react';


function ProjectListItem (props) {
  return (
    <li className="project_list_item">
      <div className="project_list_item_name">
        Name: {props.project.name}
      </div>
      <div className="project_list_item_location">
        Location: {props.project.location.street}, {props.project.location.city}, {props.project.location.state} {props.project.location.zip}
      </div>
    </li>
  )
}


export default ProjectListItem;