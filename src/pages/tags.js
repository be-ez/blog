import React from 'react'

// Utilities
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import union from 'lodash/union'

// Components
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'

// Layout
import styles from './blog.module.css'
import Layout from '../components/Layout'

class Tags extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
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
    const views = get(this, 'props.data.allContentfulView.edges')
    return (
      <Layout views={views} location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Tags</div>
          <div className="wrapper">
            <h2>Tags</h2>
            <ul>
              {Object.entries(seenGroup).map(([fieldValue, totalCount]) => (
                <li key={fieldValue}>
                  <Link to={`/tags/${kebabCase(fieldValue)}/`}>
                    {fieldValue} ({totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query {
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
    allContentfulBlogPost(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`
