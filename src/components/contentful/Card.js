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
      <Box width={1/3}>
      <Card

        boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
        <Img
            alt={content.slug}
            fluid={content.image.fluid} />
        <Box p={1} px={2}>
          <Heading as='h1'>
            {inner_content.title}
          </Heading>
          <Text
          dangerouslySetInnerHTML={{
            __html: inner_content.body.childContentfulRichText.html,
          }}
          fontSize={3}>
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
