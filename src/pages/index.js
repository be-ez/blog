import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import union from 'lodash/union'
import Helmet from 'react-helmet'
import { Box } from 'rebass'
import Collapsible from 'react-collapsible';

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import { TagsList } from './tags'
import ArticlePreview from '../components/ArticlePreview'


class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const views = get(this, 'props.data.allContentfulView.edges')

    const blogGroup = get(this, 'props.data.allContentfulBlogPost.group')
    const contentGroup = get(this, 'props.data.allContentfulGenericContent.group')
    const group = union(blogGroup, contentGroup)
    let seen = new Set();
    let seenGroup = {}
    group.map( tag => {
      if (seen.has(tag.fieldValue)){
        seenGroup[tag.fieldValue] += tag.totalCount
      } else {
        seen.add(tag.fieldValue)
        seenGroup[tag.fieldValue] = tag.totalCount
      }
    })

    return (
      <Layout views={views} location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author.node} />
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <Box key={node.slug} px={[2,0]} width={1}>
                  {/* hack(alex) */}
                    <ArticlePreview article={node} slug={"📓"}/>
                  </Box>
                )
              })}
            </ul>
            <Box py={4} >
              <Collapsible trigger={"All Tags"}>
                <TagsList seenGroup={seenGroup} />
              </Collapsible>
            </Box>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulGenericContent(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      group(field: tags) {
        fieldValue
        totalCount
      }
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
