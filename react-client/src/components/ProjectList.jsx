import React from 'react';
import ProjectListItem from './ProjectListItem.jsx';

function ProjectList (props) {
  console.log('project list props: ', props)
  return (
    <ul className="project_list">
      {props.projects.map(project => {
        return (
          <ProjectListItem project={project} onClick={(e) => props.viewProject(e, project)} />
        )
      })}
    </ul>
  )
}


export default ProjectList;