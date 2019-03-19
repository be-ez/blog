import React from "react"
import { graphql } from "gatsby"

import { Flex, Box } from 'rebass'

import ContentfulContent from './GenericContent'
import ContentfulCard from './Card'
import ContentfulLivePhoto from './LivePhoto'
import ArticlePreview from '../ArticlePreview'

import styles from './Collapsible.scss'
import more_styles from './view.css'
import Masonry from 'react-masonry-css'


function ViewContent({ title, content, slug, breakpointColumnsObj }) {
  if (Array.isArray(content)){
    return (
      <div>
      <h2 className="section-headline">{title}</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        
        {content.map((node ) => {
          if (node.__typename == "ContentfulBlogPost"){
            return (
              <Box
                key={node.slug}
                width={[1]}
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
          } else if (node.__typename == "ContentfulCard"){
            return (
            <ContentfulCard slug={slug} key={node.slug} content={node} />
            )
          } else if (node.__typename == "ContentfulLivePhoto"){
            return (
              <ContentfulLivePhoto key={node.id} content={node} />
            )
          }
        })}
      </Masonry>
      </div>
    )
  }else if (content.__typename == "ContentfulGenericContent"){

    return (
      <Box
      key={content.slug}
      width={[1, 4/5]}
      p={3}
      mx={[0,'auto']}
      >
      <ContentfulContent slug={slug}  content={content} />
      </Box>
      )
  }
  return (<p>Something Broke in Rendering the Content Type via ViewContent</p>)
}

export default ViewContent

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};


export const viewFragment = graphql`
  fragment ViewFragment on ContentfulView {
        title
        slug
        subpages
        smallViewNumberOfColumns
        mediumViewNumberOfColumns
        largeViewNumberOfColumns
        content {
          __typename
          ... on ContentfulCard {
            ... ContentfulCardFragment
          }
          ... on ContentfulLivePhoto{
            ... ContentfulLivePhotoFragment
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
