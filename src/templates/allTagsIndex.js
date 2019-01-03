import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext
  return (
    <Layout>
      <div>
        <ul>
          {tags.map(tagName => {
            return (
              <li key={tagName}>
                <Link to={`tags/${tagName}`}>{tagName}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AllTagsTemplate
