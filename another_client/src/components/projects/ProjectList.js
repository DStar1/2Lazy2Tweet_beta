import React from 'react'
import ProjectSummary from './ProjectSummary'

const ProjectList = ({projects}) => {

  return (
      <div className="project-list section"> 
          { projects && projects.map(post =>
    <div>
      <ProjectSummary post={post} />
    </div>
    ) }
    </div>
  )
}

export default ProjectList
