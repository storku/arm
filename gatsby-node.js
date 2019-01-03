const path = require(`path`)

//makes the pages for the people posts
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const roleModelPostTemplate = path.resolve(`src/templates/roleModelPost.js`)

  return graphql(`
    {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
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

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((edge, index) => {
      const path = edge.node.frontmatter.path
      createPage({
        path,
        component: roleModelPostTemplate,
        context: {
          pathSlug: path,
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === posts.length - 1 ? null : posts[index + 1].node,
        },
      })
    })
  })
}
