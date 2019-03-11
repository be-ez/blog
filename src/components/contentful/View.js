import React from "react"
import { graphql } from "gatsby"

import { Flex, Box } from 'rebass'

import ContentfulContent from './GenericContent'
import ContentfulCard from './Card'
import ArticlePreview from '../ArticlePreview'

function ViewContent({ title, content, slug }) {
  if (Array.isArray(content)){
    return (
      <div>
      <h2 className="section-headline">{title}</h2>
      <Flex >
        {content.map((node ) => {
          if (node.__typename == "ContentfulBlogPost"){
            return (
              <Box
                  width={[1/2]}
                  px={3}
                >
                <ArticlePreview article={node} />
              </Box>
            )
          } else if( node.__typename == "ContentfulGenericContent" ){
            return (
              <Box
                  width={[1/2]}
                  px={3}
                >
                <ContentfulContent slug={slug} key={node.slug} content={node} />
              </Box>
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
