import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const Template = props => {
  const {
    frontmatter: { title },
    html,
  } = props.data.markdownRemark

  const { prev, next } = props.pageContext

  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {prev && <Link to={prev.frontmatter.path}>Previous</Link>}
      {next && <Link to={next.frontmatter.path}>Next</Link>}
    </Layout>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template
