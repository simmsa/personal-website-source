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
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
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
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const slugPath = node.fields.slug
        .split("/")
        .slice(0, -2)
        .join("/")
      const slug =
        slugPath +
        "/" +
        slugify(node.frontmatter.title, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        })
      createPage({
        // path: node.fields.slug,
        path: slug,
        component: path.resolve(`./src/templates/BlogPost.tsx`),
        context: {
          slugString: node.fields.slug,
        },
      })
    })
  })
}
