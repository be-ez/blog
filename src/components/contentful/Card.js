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
  console.log(title)
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
  console.log(inner_content.slug)
  return (
      <Box
        width={[1/2]}
      >
        <Card
          boxShadow='0 0 16px rgba(0, 0, 0, .25)'
          mx='3'
        >
          <Img
              alt={content.slug}
              fluid={content.image.fluid} />
          <Box height={5} px={1}>
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
