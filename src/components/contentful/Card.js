import React from "react"
import { graphql } from "gatsby"
import ContentfulContent from './GenericContent'
import Img from 'gatsby-image'
import {
  Box,
  Card,
  Heading,
  Text
} from 'rebass'

export default function ContentfulCard({content, slug}) {
  const inner_content =content.content
  return (
    <div>
      <Box m='auto' width={[
        1,
      ]}>
      <Card

        boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
        <Img
            alt={content.slug}
            fluid={content.image.fluid} />
        <Box px={1}>
          <Heading as='h1'>
            {inner_content.title}
          </Heading>
          <Text
          dangerouslySetInnerHTML={{
            __html: content.description.childMarkdownRemark.html,
          }}
          fontSize={1}>
          </Text>
        </Box>
      </Card>
      </Box>
    </div>
  )
}

export const cardFragment = graphql`
  fragment ContentfulCardFragment on ContentfulCard {
    slug
    description {
      childMarkdownRemark {
        id
        html
      }
    }
    image {
      fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
    content {
      ... on ContentfulGenericContent {
        ...GenericContentFragment
      }
    }
  }
`
