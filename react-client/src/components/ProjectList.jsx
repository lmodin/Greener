import React from 'react';
import ProjectListItem from './ProjectListItem.jsx';

function ProjectList (props) {
  return (
    <ul className="project_list">
      {props.projects.map(project => {
        return (
          <a onClick={((e) => props.viewProject(e, project))}>
            <ProjectListItem project={project} />
          </a>
        )
      })}
    </ul>
  )
}

export default ProjectList;