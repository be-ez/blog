import React from "react"
import { graphql, Link } from "gatsby"
import ContentfulContent from './GenericContent'
import Img from 'gatsby-image'
import {
  Box,
  Card,
  Heading,
  Text
} from 'rebass'

function TitleOrLink(title, slug){
  if (make_link){
    return (
      <Link to={slug}>
          <Heading as='h1'>
            {title}
          </Heading>
      </Link>
      )
  }
  return (
    <Heading as='h1'>
      {title}
    </Heading>
  )

}

export default function ContentfulCard({content, slug}) {
  const inner_content =content.content

  return (
      <Box
        width={[1, 1/2]}
        height={1}
        py='3'
        Flex
      >
        <Card
          boxShadow='0 0 16px rgba(0, 0, 0, .25)'
          mx='3'
        >
          <Img
              alt={content.slug}
              fluid={content.image.fluid} />
          <Box height={5} p={1} px={2}>
          <Link to={'/'+slug + '/'+content.content.slug +'/'}>
              <Heading as='h1'>
                {inner_content.title}
              </Heading>
          </Link>
            <Text
              dangerouslySetInnerHTML={{
                __html: content.description.childMarkdownRemark.html,
              }}
              fontSize={1}
            />
          </Box>
      </Card>
      </Box>
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
      fluid(maxHeight: 350,) {
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
