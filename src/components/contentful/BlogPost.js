import React from "react"
import { graphql } from "gatsby"

function ContentfulCard(props) {
  const title = props.data.title
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export const blogPostFragment = graphql`
  fragment BlogPostFragment on ContentfulBlogPost {
    title
    slug
    publishDate(formatString: "MMMM Do, YYYY")
    tags
    heroImage {
      id
    }
    description {
      childMarkdownRemark {
        html
      }
    }
  }
`
export const blogArticlePreviewFragment = graphql`
  fragment BlogArticlePreviewFragment on ContentfulBlogPost {
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
`
