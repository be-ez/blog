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
    console.log(content)
    // const subpages = get(this.props, 'data.contentfulView.subpages')
    // Render list nested view
      return (
        <Layout location={this.props.location}>
         <Helmet title={siteTitle} />
         <ViewContent key={content.slug}  content={content} />
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
  }
`
