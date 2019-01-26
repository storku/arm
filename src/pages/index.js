import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = props => {
  const { title, description } = props.data.site.siteMetadata
  const { edges } = props.data.allMarkdownRemark
  return (
    <Layout>
      <h1>Hello Everyone!</h1>
      <p>Welcome to {title}</p>
      <p>{description}</p>
      {edges.map(edge => {
        const {
          frontmatter: { title, path },
        } = edge.node
        return (
          <div key={path}>
            <Link to={path}>{title}</Link>
          </div>
        )
      })}
      <div>
        <Link to="ethnicity">Browse by Ethnicity</Link>
      </div>
      <div>
        <Link to="nationality">Browse by Nationality</Link>
      </div>
      <div>
        <Link to="profession">Browse by Profession</Link>
      </div>
      <div>
        <Link to="tags">Browse by Tags</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            first_name
            last_name
            path
            date
            excerpts
          }
          html
        }
      }
    }
  }
`

export default IndexPage
