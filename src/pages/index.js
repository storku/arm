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
      <p>Let's do something great.</p>
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
      <Link to="/page-2/">Go to page 2</Link>
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
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
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
