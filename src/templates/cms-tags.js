import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import ArticlePreview from '../components/ArticlePreview'
import ContentfulContent from '../components/contentful/GenericContent'
import ViewContent from '../components/contentful/View'
import heroStyles from '../components/Hero/hero.module.css'
import {
  Box,
  Card,
  Heading,
  Text
} from 'rebass'

class TagsTemplate extends React.Component {
  render() {
    const view = get(this.props, 'data.contentfulView')
    const tagPathLinks = get(this.props, 'pageContext.tagPathLinks')
    const tag = get(this.props, 'pageContext.tag')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    // const content = get(this.props, 'data.contentfulView.content')
    const genericContent = get(this.props, 'data.allContentfulGenericContent.edges')
    const blogPosts = get(this.props, 'data.allContentfulBlogPost.edges')
    const views = get(this.props, 'data.allContentfulView.edges')
    // const subpages = get(this.props, 'data.contentfulView.subpages')
    // Render list nested view
      return (
        <Layout views={views} location={this.props.location} >
          <div style={{ background: '#fff' }}>
            <Helmet title={siteTitle +"-"+ tag} />
            <div className="wrapper">
              <Heading><Card>{tag}</Card></Heading>
                {(blogPosts || []).map(({ node }) => {
                    let [viewSlug, tagSlug] = tagPathLinks.filter(([viewSlug, tagSlug]) => tagSlug==node.slug)[0]
                    const { slug, title } = node
                    const path = 'blog/' + slug
                    return (
                        <Box
                          width={[1/2]}
                          p={2}
                          key={path}
                        >
                        <ArticlePreview article={node} />
                        <p>{viewSlug}/{tagSlug}</p>
                        </Box>
                    )
                  })}

                  {(genericContent || []).map(({node}) => {
                    let [viewSlug, tagSlug] = tagPathLinks.filter(([viewSlug, tagSlug]) => tagSlug==node.slug)[0]
                      return (
                        <Box  width={[1/2]}
                              key={viewSlug+tagSlug}
                        >
                          <p>{viewSlug}/{tagSlug}</p>
                          <ContentfulContent slug={viewSlug} key={tagSlug} content={node} />
                        </Box>
                    )
                  })}

                  {/* {(tagPathLinks || []).map(([ viewSlug, tagSlug ]) => {
                    if (!genericContent){
                      return
                    }
                    const content = genericContent.filter(edge => edge.node.slug == tagSlug);
                    console.log(content)

                    return (
                        <Box  width={[1/2]}
                              key={viewSlug+tagSlug}
                        >
                          <p>{viewSlug}/{tagSlug}</p>
                          <ContentfulContent slug={viewSlug} key={tagSlug} content={content[0].node} />
                        </Box>
                    )
                  })} */}
              </div>
            </div>
        </Layout>
      )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query ViewByTag($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulView(limit: 10) {
      edges {
        node {
          title
          slug
          appearInNav
        }
      }
    }
    allContentfulBlogPost(
      limit: 2000
      sort: { order: DESC, fields: [publishDate] }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulGenericContent(
        limit: 2000
        filter: { tags: { in: [$tag] } }
      ) {
        totalCount
        edges {
          node{
            tags
            ... GenericContentFragment
          }
        }
      }
  }
`
