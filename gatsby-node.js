const path = require(`path`)
const createPageNodes = require('./utils/createPageNodes')

//create pages for ethnicity
const createEthnicityPages = (createPage, posts) => {
  createPageNodes(
    createPage,
    posts,
    'ethnicity',
    'allItemsIndex',
    'singleItemIndex'
  )
}

//create pages for nationality
const createNationalityPages = (createPage, posts) => {
  createPageNodes(
    createPage,
    posts,
    'nationality',
    'allItemsIndex',
    'singleItemIndex'
  )
}

//create pages for profession
const createProfessionPages = (createPage, posts) => {
  createPageNodes(
    createPage,
    posts,
    'profession',
    'allItemsIndex',
    'singleItemIndex'
  )
}

//create pages for tags
const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

  const postsByTag = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }

        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  })

  tags.forEach(tagName => {
    const posts = postsByTag[tagName]

    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        posts,
        tagName,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const roleModelPostTemplate = path.resolve(`src/templates/roleModelPost.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              ethnicity
              nationality
              profession
              tags
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

    createTagPages(createPage, posts)

    createEthnicityPages(createPage, posts)
    createNationalityPages(createPage, posts)
    createProfessionPages(createPage, posts)

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
