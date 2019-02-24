import React from "react"
import { graphql } from "gatsby"

function ContentfulView(props) {
  const content = props.data.content
  console.log(content)
  const title = props.data.title
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export const viewFragment = graphql`
  fragment ViewFragment on ContentfulView {
        title
        content {
          __typename
          ... on ContentfulCard {
            ... ContentfulCardFragment
          }
          ... on ContentfulGenericContent {
            ... GenericContentFragment
          }
          ... on ContentfulBlogPost {
            slug
            title
            description {
              description
            }
            body {
              body
            }
          }
        }
        header {
          text
          overlay
          image {
            title
          }
        }
      }
`
