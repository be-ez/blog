import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ViewContent from '../components/contentful/View'
import heroStyles from '../components/hero.module.css'


class ViewDefaultTemplate extends React.Component {
  render() {
    const content = get(this.props, 'data.contentfulGenericContent')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const views = get(this.props, 'data.allContentfulView.edges')
    // Render list nested view
      return (
        <Layout views={views} location={this.props.location}>
         <Helmet title={siteTitle} />
         <div className="wrapper">
           <ViewContent key={content.slug}  content={content} />
         </div>
        </Layout>
      )
  }
}

export default ViewDefaultTemplate

export const pageQuery = graphql`
  query ViewDefaultBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulGenericContent(slug: {eq: $slug}) {
      ... GenericContentFragment
      __typename

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
  }
`
