const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const cmsView = path.resolve('./src/templates/cms-view.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  tags
                  slug
                }
              }
            }
            allContentfulView {
              edges{
                node{
                  title
                  slug
                  subpages
                  content{
                    ... on ContentfulCard {
                      slug
                    }
                    ... on ContentfulGenericContent{
                      slug
                    }
                    ... on ContentfulBlogPost {
                      slug
                    }
                  }
                }
              }
            }
          }

          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const views = result.data.allContentfulView.edges
        views.forEach((view, index) => {
          if (view.node.subpages){
            view.node.content.forEach((content, index) => {
              console.log(view.node.slug + "/" + content.slug)
              createPage({
                path: `/${view.node.slug}/${content.slug}/`,
                component: blogPost,
                context: {
                  slug: content.slug
                },
              })
            })
          }
          // Create root of multi page, this ideally needs
          // to recurse to build /n1/n../nx trees
          createPage({
            path: `/${view.node.slug}`,
            component: cmsView,
            context: {
              slug: view.node.slug
            },
          })
        })

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
         // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, "node.tags")) {
            tags = tags.concat(edge.node.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)
        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })
      })
    )
  })
}
