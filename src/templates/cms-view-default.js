import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import {Box} from 'rebass'
import Layout from '../components/Layout'
import ContentfulContent from '../components/contentful/GenericContent'


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
         <Box
            key={content.slug}
            width={[1, 4/5]}
            p={3}
            mx={[0,'auto']}
            >
            <ContentfulContent  content={content} />
          </Box>
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
