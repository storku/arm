//used by gatsby-node.js
//replaces a createXxxxxPages function like createTagsPages or createEthnicityPages
//takes createPages (function), posts (array), itemType (string) and
//file names for allItemsIndex (string) and singleItemIndex (string) as arguments
const path = require(`path`)

//NOTE, if pages do not show up, Make sure graphql is querying it in
//exports.createPages function of gatsby-node.js!
module.exports = (
  createPage,
  posts,
  itemType,
  allItemsIndex,
  singleItemIndex
) => {
  const allItemsIndexTemplate = path.resolve(
    `src/templates/${allItemsIndex}.js`
  )
  const singleItemIndexTemplate = path.resolve(
    `src/templates/${singleItemIndex}.js`
  )

  const postsByItem = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter[itemType]) {
      node.frontmatter[itemType].forEach(item => {
        if (!postsByItem[item]) {
          postsByItem[item] = []
        }

        postsByItem[item].push(node)
      })
    }
  })

  const items = Object.keys(postsByItem)

  createPage({
    path: `/${itemType}`,
    component: allItemsIndexTemplate,
    context: {
      [itemType]: items.sort(),
    },
  })

  items.forEach(itemName => {
    const posts = postsByItem[itemName]

    createPage({
      path: `/${itemType}/${itemName}`,
      component: singleItemIndexTemplate,
      context: {
        posts,
        itemName,
      },
    })
  })
}
