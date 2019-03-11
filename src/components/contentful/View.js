import React from "react"
import { graphql } from "gatsby"

import { Flex, Box } from 'rebass'

import ContentfulContent from './GenericContent'
import ContentfulCard from './Card'
import ArticlePreview from '../ArticlePreview'

import styles from './Collapsible.scss'

function ViewContent({ title, content, slug }) {
  if (Array.isArray(content)){
    return (
      <div>
      <h2 className="section-headline">{title}</h2>
      <Flex flexWrap='wrap' mx={-2}>
        {content.map((node ) => {
          if (node.__typename == "ContentfulBlogPost"){
            return (
              <Box
                key={node.slug}
                width={[1, 1/2]}
                p={3}
                Flex
                >
                <ArticlePreview article={node} slug={slug} />
              </Box>
            )
          } else if( node.__typename == "ContentfulGenericContent" ){
            return (
                <ContentfulContent key={node.slug} slug={slug}  content={node} />
            )
          } else if (node.__typename == "ContentfulCard"){
            return (
            <ContentfulCard slug={slug} key={node.slug} content={node} />
            )
          }
        })}
      </Flex>
      </div>
    )
  }else if (content.__typename == "ContentfulGenericContent"){

    return (
      <ContentfulContent slug={slug} key={content.slug}  content={content} />
      )
  }
  return (<p>Something Broke in Rendering the Content Type via ViewContent</p>)
}

export default ViewContent

export const viewFragment = graphql`
  fragment ViewFragment on ContentfulView {
        title
        slug
        subpages
        content {
          __typename
          ... on ContentfulCard {
            ... ContentfulCardFragment
          }
          ... on ContentfulGenericContent {
            ... GenericContentFragment
          }
          ... on ContentfulBlogPost {
            ... BlogArticlePreviewFragment
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
