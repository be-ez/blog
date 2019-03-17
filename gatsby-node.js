const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

//https://github.com/gatsbyjs/gatsby/issues/11934
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const cmsView = path.resolve('./src/templates/cms-view.js')
    const newtagTemplate = path.resolve('./src/templates/cms-tags.js')
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
                        tags
                      }
                      __typename
                    }
                    ... on ContentfulGenericContent{
                      slug
                      tags
                      __typename
                    }
                    ... on ContentfulBlogPost {
                      slug
                      tags
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
        let tag_map = {}
        const views = result.data.allContentfulView.edges
        views.forEach((view, index) => {
          view.node.content.forEach((content) => {
            content
          })
          // Iterate through each content, putting all found tags into `tags`
          _.each(view.node.content, edge => {
            if (_.get(edge, "tags")) {
              tags = tags.concat(edge.tags)
              edge.tags.forEach((tag) => {
                if (!(tag in tag_map)){
                  tag_map[tag] = {}
                }
                if (!(view.node.slug in tag_map[tag])){
                  tag_map[tag][view.node.slug] = []
                }
                tag_map[tag][view.node.slug].push(edge.slug)
              })
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
                tags = tags.concat(content.content.tags)
                createPage({
                  path: `/${view.node.slug}/${content.slug}/`,
                  component: cmsViewDefault,
                  context: {
                    slug: content.slug,
                    parent_slug: view.node.slug
                  },
                })
              } else if (content.__typename == ['ContentfulCard'] ){
                tags = tags.concat(content.content.tags)
                if (content.content.tags){
                  content.content.tags.forEach((tag) => {
                    if (!(tag in tag_map)){
                      tag_map[tag] = {}
                    }
                    if (!(view.node.slug in tag_map[tag])){
                      tag_map[tag][view.node.slug] = []
                    }
                    tag_map[tag][view.node.slug].push(content.content.slug)
                  })
                }

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

        // Eliminate duplicate tags
        tags = _.uniq(tags)
        tags.forEach(tag => {
          var tagPathLinks = []
          for (var viewSlug in tag_map[tag]) {
            tag_map[tag][viewSlug].forEach(slug => {
              tagPathLinks.push([viewSlug, slug])
            })
          }
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: newtagTemplate,
            context: {
              tag,
              tagPathLinks
            },
          })
        })
      })
    )
  })
}
