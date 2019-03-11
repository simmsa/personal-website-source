const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const slugify = require("slugify")

/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({ node, getNode, basePath: `pages` })
    const slug = slugify(node.frontmatter.title, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    })

    // Remove the last part of the path and replace with the slugified title
    const fullPath =
      filePath
        .split("/")
        .slice(0, -2)
        .join("/") +
      "/" +
      slug
    createNodeField({
      node,
      name: `slug`,
      value: fullPath,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/BlogPost.tsx`),
        context: {
          slugString: node.fields.slug,
        },
      })
    })
  })
}
