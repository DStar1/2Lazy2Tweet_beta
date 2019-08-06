import React from 'react'

const ProjectSummary = ({post}) => {
  return (

    <div className="card z-depth-0 posts" id="posts">
       <div className="card-content grey-text text-darken-3">
         <span className="card-title ">Twitter: {post.twitter}</span>
         <p>{post.post}</p>
         <p className="grey-text">Date to post: {post.dateToPost}</p>
       </div>
    </div>
  )
}

export default ProjectSummary
