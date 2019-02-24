import React from "react"
import { graphql } from "gatsby"

function ContentfulContent(props) {
  const content = props.content
  return (
    <div>
      <h1>{content.title}</h1>
      {/* {{content}} */}
    </div>
  )
}
export default ContentfulContent

export const genericContentFragment = graphql`
  fragment GenericContentFragment on ContentfulGenericContent  {
    title
    slug
    body {
      content {
        content {
          value
        }
      }
    }
  }
`
