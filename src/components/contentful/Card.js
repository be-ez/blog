import React from "react"
import { graphql } from "gatsby"
import ContentfulContent from './GenericContent'

export default function ContentfulCard({content, slug}) {
  console.log(content)
  const inner_content =content.content
  return (
    <div>
      <ContentfulContent slug={slug} content={inner_content} />
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
