import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import ViewContent from '../components/contentful/View'
import heroStyles from '../components/Hero/hero.module.css'

class ViewTemplate extends React.Component {
  render() {
    const view = get(this.props, 'data.contentfulView')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    // const content = get(this.props, 'data.contentfulView.content')
    const views = get(this.props, 'data.allContentfulView.edges')

    const breakpointColumnsObj = {
      default: view.largeViewNumberOfColumns,
      1100: view.largeViewNumberOfColumns,
      700: view.mediumViewNumberOfColumns,
      500: view.smallViewNumberOfColumns
    };
    // const subpages = get(this.props, 'data.contentfulView.subpages')
    // Render list nested view
      return (
         <Layout views={views} location={this.props.location} >
          <div style={{ background: '#fff' }}>
            <Helmet title={siteTitle +"-"+ view.slug} />
            {view.heroImage ? (
              <div className={heroStyles.hero}>
              {/* TODO: Implement Header */}
              <Img
                className={heroStyles.heroImage}
                alt={view.title}
                fluid={view.heroImage.fluid ? view.heroImage.fluid : 'not'}
              />
            </div>
            ) : (
              <div></div>
            )}
            <div className="wrapper">
              <ViewContent slug={view.slug} title={view.title} breakpointColumnsObj={breakpointColumnsObj} content={view.content} />
            </div>
          </div>
        </Layout>
      )
  }
}

export default ViewTemplate

export const pageQuery = graphql`
  query ViewBySlug($slug: String!) {
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
    contentfulView(slug: {eq: $slug}) {
      ...ViewFragment
    }
    
  }
`
