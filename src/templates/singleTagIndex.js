import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const SingleTagsTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext
  return (
    <Layout>
      <div>Posts about {tagName}</div>
      <div>
        <ul>
          {posts.map(post => {
            const { title, path } = post.frontmatter
            return (
              <li key={title}>
                <Link to={path}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default SingleTagsTemplate
