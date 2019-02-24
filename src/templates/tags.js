import React from 'react'
import PropTypes from 'prop-types'

import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allContentfulBlogPost
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <div>
      <Layout>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1>{tagHeader}</h1>
            <ul className="article-list">
              {edges.map(({ node }) => {
                const { slug, title } = node
                const path = 'blog/' + slug
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
            <Link to="/tags">All tags</Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags

export const pageQuery = graphql`
  query($tag: String) {
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
  }
`
