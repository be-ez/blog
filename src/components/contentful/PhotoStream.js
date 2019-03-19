import React, { Component } from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Masonry from 'react-masonry-css'


import PropTypes from 'prop-types';



export default function ContentfulPhotoStream({content}) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 4,
    700: 3,
    500: 3
  };
  return (
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
      {content.images.map((image ) => {
        return (
          <Img
          key={image.id}
          alt={image.title}
          fluid={image.fluid} />
        )
      })}
    </Masonry>
  )
}

export const cardFragment = graphql`
  fragment ContentfulPhotoStreamFragment on ContentfulPhotoStream {
    id
    title
    slug
    images {
      id
      fluid{
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
  }
`
