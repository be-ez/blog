import React from "react"
import { graphql } from "gatsby"

import { Flex, Box } from 'rebass'

import ContentfulContent from './GenericContent'
import ContentfulCard from './Card'
import ContentfulLivePhoto from './LivePhoto'
import ContentfulPhotoStream from './PhotoStream'
import ArticlePreview from '../ArticlePreview'

import styles from './Collapsible.scss'
import more_styles from './view.css'
import Masonry from 'react-masonry-css'
import { timeout } from "q";

function mapContent(view) {
  return  view.content.map((node ) => {
    if (node.__typename == "ContentfulBlogPost"){
      return (
        <Box
          key={node.slug}
          width={[1]}
          p={3}
          Flex
          >
          <ArticlePreview article={node} slug={view.slug} />
        </Box>
      )
    } else if( node.__typename == "ContentfulGenericContent" ){
      return (
          <ContentfulContent key={node.slug} slug={view.slug}  content={node} />
      )
    } else if (node.__typename == "ContentfulCard"){
      return (
      <ContentfulCard slug={view.slug} key={node.slug} content={node} />
      )
    } else if (node.__typename == "ContentfulCard"){
      return (
      <ContentfulCard slug={view.slug} key={node.slug} content={node} />
      )
    } else if (node.__typename == "ContentfulLivePhoto"){
      return (
        <ContentfulLivePhoto key={node.id} content={node} />
      )
    }  else if (node.__typename == "ContentfulPhotoStream"){
      return (
        <ContentfulPhotoStream key={node.id} content={node} />
      )
      
    }
  })
}

function layoutMasonary(view){
  const breakpointColumnsObj = {
    default: view.largeViewNumberOfColumns,
    1100: view.largeViewNumberOfColumns,
    700: view.mediumViewNumberOfColumns,
    500: view.smallViewNumberOfColumns
  };
  return (
    <div>
      <h2 className="section-headline">{view.title}</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {mapContent(view)}
      </Masonry>
    </div>
  )
}

function layoutNone(view){
  return (
    <div>
      <h2 className="section-headline">{view.title}</h2>
        {mapContent(view)}
    </div>
  )
}

function ViewContent({ view }) {
  if (Array.isArray(view.content)){
      if (view.layoutType.toLowerCase() == "masonry"){
        return layoutMasonary(view)
      } else if (view.layoutType.toLowerCase() == "none"){
        return layoutNone(view)
      }

    
  }else if (view.content.__typename == "ContentfulGenericContent"){

    return (
      <Box
      key={view.content.slug}
      width={[1, 4/5]}
      p={3}
      mx={[0,'auto']}
      >
      <ContentfulContent slug={view.slug}  content={view.content} />
      </Box>
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
        layoutType
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
          ... on ContentfulPhotoStream {
            ... ContentfulPhotoStreamFragment
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
