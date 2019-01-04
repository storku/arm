import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const Template = props => {
  const { frontmatter, html } = props.data.markdownRemark
  const { prev, next } = props.pageContext

  const {
    title,
    birth_date,
    ethnicity,
    nationality,
    profession,
    tags,
    notable,
  } = frontmatter

  console.log({ props })

  return (
    <Layout>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <ul>
          <li>Birthday: {birth_date}</li>
          <li>Ethnicity: {ethnicity.reduce((acc, cur) => `${acc}, ${cur}`)}</li>
          <li>
            Nationality: {nationality.reduce((acc, cur) => `${acc}, ${cur}`)}
          </li>
          <li>
            Profession: {profession.reduce((acc, cur) => `${acc}, ${cur}`)}
          </li>
          <li>Notable: {notable}</li>
          <li>Tags: {tags.reduce((acc, cur) => `${acc}, ${cur}`)}</li>
        </ul>
      </div>
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
        date
        published
        title
        first_name
        last_name
        birth_date
        death_date
        ethnicity
        nationality
        profession
        tags
        notable
        excerpts
      }
    }
  }
`

export default Template
