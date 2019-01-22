import React from 'react'
import { graphql, Link } from 'gatsby'
// import Paper from '@material-ui/core/Paper'
import Layout from '../components/layout'
import itemsToLinks from '../utils/itemsToLinks'

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
    attachments,
  } = frontmatter
  const { publicURL } = attachments[0]

  console.log({ props })

  return (
    <Layout>
      <div>
        <h1>{title}</h1>
      </div>
      <div className="PersonInfobox">
        <div className="ProtraitImage">
          <img src={publicURL} alt="main" />
        </div>
        <dl>
          <div>
            <dt>Birthday:</dt>
            <dd>{birth_date}</dd>
          </div>
          <div>
            <dt>Ethnicity:</dt>
            <dd>{itemsToLinks(ethnicity, 'ethnicity')}</dd>
          </div>
          <div>
            <dt>Nationality:</dt>
            <dd>{itemsToLinks(nationality, 'nationality')}</dd>
          </div>
          <div>
            <dt>Profession:</dt>
            <dd>{itemsToLinks(profession, 'profession')}</dd>
          </div>
          <div>
            <dt>Notable:</dt>
            <dd>{notable}</dd>
          </div>
          <div>
            <dt>Tags:</dt>
            <dd>{itemsToLinks(tags, 'tags')}</dd>
          </div>
        </dl>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {prev && <Link to={prev.frontmatter.path}>Previous</Link>}
      {next && <Link to={next.frontmatter.path}>Next</Link>}
    </Layout>
  )
}

export const query = graphql`
  query RoleModelPostByPath($pathSlug: String!) {
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
        attachments {
          publicURL
        }
      }
    }
  }
`

export default Template
