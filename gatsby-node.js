const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programatically
// create pages.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against this Gatsbygram's graphql schema. Think of
    // it like Gatsbygram has a built-in database constructed
    // from static data that you can run queries against.
    //
    // Post is a data node type derived from data/posts.json
    // which is created when scrapping Instagram. “allPostsJson”
    // is a "connection" (a GraphQL convention for accessing
    // a list of nodes) gives us an easy way to query all
    // Post nodes.
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000, filter: { frontmatter: { draft: { ne: true }}})  {
              edges {
                node {
                  id
                  html
                  frontmatter {
                    title
                    path
                    date
                    draft
                    author
                    parent
                    summary
                    tags
                  }
                }
              }
            }
          }
    `
      ).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        // Create image post pages.
        const blogTemplate = path.resolve(`src/templates/blog-page.js`)
        // We want to create a detailed page for each
        // Instagram post. Since the scrapped Instagram data
        // already includes an ID field, we just use that for
        // each page's path.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          console.log("Blog Post Made: "+edge.node.frontmatter.path)
          createPage({
            path: edge.node.frontmatter.path, // required
            component: slash(blogTemplate),
            context: {
              path: edge.node.frontmatter.path,
            },
          })
        })

        return
      })
    )
  })
}
