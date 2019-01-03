const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const roleModelPostTemplate = path.resolve(`src/templates/roleModelPost.js`)

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allMarkdownRemark.edges.forEach(edge => {
      const path = edge.node.frontmatter.path
      createPage({
        path,
        component: roleModelPostTemplate,
        context: {
          pathSlug: path,
        },
      })
    })
  })
}
