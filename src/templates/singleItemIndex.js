import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const SingleItemTemplate = ({ data, pageContext }) => {
  const { posts, itemName } = pageContext
  return (
    <Layout>
      <div>Posts about {itemName}</div>
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

export default SingleItemTemplate
