import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ContentfulContent from '../components/contentful/GenericContent'
import ArticlePreview from '../components/article-preview'

import heroStyles from '../components/hero.module.css'

function ViewContent({ title, content }) {
  if (Array.isArray(content)){
    return (
      <div className="wrapper">
      <h2 className="section-headline">{title}</h2>
      <ul className="article-list">
        {content.map((node ) => {
          if (node.__typename == "ContentfulBlogPost"){
            return (
              <li key={node.slug}>
                <ArticlePreview article={node} />
              </li>
            )
          } else if( node.__typename == "ContentfulGenericContent" ){
            return (
              <ContentfulContent key={node.slug}  content={node} />
            )
          }
        })}
      </ul>
    </div>
    )
  }
  return (<p>tst</p>)
}

class ViewTemplate extends React.Component {
  render() {
    const view = get(this.props, 'data.contentfulView')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const content = get(this.props, 'data.contentfulView.content')
    // const subpages = get(this.props, 'data.contentfulView.subpages')
    // Render list nested view
      return (
        <Layout location={this.props.location}>
         <Helmet title={siteTitle} />
         <div className={heroStyles.hero}>
            {/* TODO: Implement Header */}
            <Img
              className={heroStyles.heroImage}
              alt={view.title}
              fluid={view.heroImage.fluid}
            />
          </div>
          <ViewContent title={view.title} content={view.content} />
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
    contentfulView(slug: {eq: $slug}) {
      title
      subpages
      heroImage {
            fluid(maxWidth: 1180, background: "rgb:000000") {
              ...GatsbyContentfulFluid_tracedSVG
            }
      }
      content{
        __typename
        ... on ContentfulCard {
          ... ContentfulCardFragment
        }
        ... on ContentfulGenericContent{
          ... GenericContentFragment
        }
        ... on ContentfulBlogPost {
          title
          slug
          tags
          publishDate(formatString: "MMMM Do, YYYY")
          heroImage {
            fluid(maxWidth: 1180, background: "rgb:000000") {
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
