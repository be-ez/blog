import React from "react"
import { graphql } from "gatsby"

import ContentfulContent from './GenericContent'
import ArticlePreview from '../article-preview'

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

export default ViewContent

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
