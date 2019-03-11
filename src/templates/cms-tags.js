import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Collapsible from 'react-collapsible';
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import ArticlePreview from '../components/ArticlePreview'
import ContentfulContent from '../components/contentful/GenericContent'
import styles from '../components/contentful/Collapsible.scss'

import ViewContent from '../components/contentful/View'
import heroStyles from '../components/Hero/hero.module.css'
import {
  Flex,
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
                      <Flex
                       key={path}
                      className="align-items-center"
                      >
                        <Box
                        width={1/8}
                        >
                          <div className='right'><Link to={"/"+viewSlug+"/"+tagSlug}>{viewSlug}/{tagSlug}</Link></div>
                        </Box>
                        <Box
                          width={7/8}
                          p={2}
                          flex='1 1 auto'
                        >
                        <Collapsible trigger={title}>
                          <ArticlePreview className='center' article={node} slug={viewSlug} />
                        </Collapsible>
                        </Box>
                      </Flex>
                    )
                  })}

                  {(genericContent || []).map(({node}) => {
                    let [viewSlug, tagSlug] = tagPathLinks.filter(([_, tagSlug]) => tagSlug==node.slug)[0]
                      return (
                        <Flex
                        key={viewSlug+tagSlug}
                      className="align-items-center"
                      >
                        <Box
                        width={1/8}
                        >
                          <div className='right'><Link to={"/"+viewSlug+"/"+tagSlug}>{viewSlug}/{tagSlug}</Link></div>
                        </Box>
                        <Box
                          width={7/8}
                          p={2}
                        >
                        <Collapsible trigger={node.title}>
                          <ContentfulContent slug={viewSlug} key={tagSlug} content={node} />
                        </Collapsible>
                        </Box>
                      </Flex>

                    )
                  })}
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
        sort: { order: DESC, fields: [createdAt] }
        filter: { tags: { in: [$tag] } }
      ) {
        totalCount
        edges {
          node{
            createdAt(formatString: "MMMM Do, YYYY")
            tags
            ... GenericContentFragment
          }
        }
      }
  }
`
