import React from "react"
import { graphql } from "gatsby"

function ContentfulContent(props) {
  const content = props.content
  if (content.body){
    return (
      <div>
        <h1>{content.title}</h1>
        <div
                dangerouslySetInnerHTML={{
                  __html: content.body.childContentfulRichText.html,
                }}
              />
      </div>
    )
  }
  return (
    <div>
      <h1>{content.title}</h1>
    </div>
  )
}
export default ContentfulContent

export const genericContentFragment = graphql`
  fragment GenericContentFragment on ContentfulGenericContent  {
    title
    slug
    body {
      childContentfulRichText {
          html
      }
    }
  }
`
