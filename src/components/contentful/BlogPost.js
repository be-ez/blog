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
