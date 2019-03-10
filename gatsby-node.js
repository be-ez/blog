const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const cmsView = path.resolve('./src/templates/cms-view.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')
    const cmsViewDefault = path.resolve('./src/templates/cms-view-default.js')

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
                      content{
                        slug
                      }
                      __typename
                    }
                    ... on ContentfulGenericContent{
                      slug
                      __typename
                    }
                    ... on ContentfulBlogPost {
                      slug
                      __typename
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
         // Tag pages:
        let tags = []
        const views = result.data.allContentfulView.edges
        views.forEach((view, index) => {
          view.node.content.forEach((content) => {
            content
          })
          // Iterate through each content, putting all found tags into `tags`
          _.each(view.node.content, edge => {
            if (_.get(edge, "tags")) {
              tags = tags.concat(edge.tags)
            }
          })

          if (view.node.subpages){
            view.node.content.forEach((content, index) => {
              if (content.__typename == 'ContentfulBlogPost'){
                createPage({
                  path: `/${view.node.slug}/${content.slug}/`,
                  component: blogPost,
                  context: {
                    slug: content.slug,
                    parent_slug: view.node.slug
                  },
                })
              } else if (content.__typename == 'ContentfulView'){
                createPage({
                  path: `/${view.node.slug}/${content.slug}/`,
                  component: cmsView,
                  context: {
                    slug: content.slug,
                    parent_slug: view.node.slug
                  },
                })
              } else if (content.__typename == ['ContentfulGenericContent'] ){
                createPage({
                  path: `/${view.node.slug}/${content.slug}/`,
                  component: cmsViewDefault,
                  context: {
                    slug: content.slug,
                    parent_slug: view.node.slug
                  },
                })
              } else if (content.__typename == ['ContentfulCard'] ){
                createPage({
                  path: `/${view.node.slug}/${content.content.slug}/`,
                  component: cmsViewDefault,
                  context: {
                    slug: content.content.slug,
                    parent_slug: view.node.slug
                  },
                })
              }

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
