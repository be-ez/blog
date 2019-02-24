import React from "react"
import { graphql } from "gatsby"

function ContentfulCard(props) {
  const content = props.data.content
  console.log(content)
  const sluf = props.data.slug
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
    </div>
  )
}

export const cardFragment = graphql`
  fragment ContentfulCardFragment on ContentfulCard {
    slug
    content {
      ... on ContentfulGenericContent {
        ...GenericContentFragment
      }
    }
  }
`
