import React from 'react'

// Utilities
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import union from 'lodash/union'

// Components
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'

import {
  Box,
  Card,
  Flex
} from 'rebass'

// Layout
import styles from './blog.module.css'
import Layout from '../components/Layout'

class TagPil extends React.Component {
  
  render (){
    const {
      tag,
      count
    } = this.props;
    var pilColor = "#f2f2f2";

    if (count >= 3 &&  count < 9){
      pilColor = "lightskyblue"
    } else if ( count >= 10 ) {
      pilColor ="plum"
    }
      
    return (
    <Link className="new-tag" to={`/tags/${kebabCase(tag)}/`}>
      <Card
        className="center"
        borderColor="#A0A0A0"
        boxShadow='0 0 2px rgba(0, 0, 0, .25)'
        m={[1]}
        borderRadius={2}
        p={[1]}
        width={'auto'}
        Flex
      >
      <Flex justifyContent='space-between'>
        <Box
        width={2/3}
        Flex
        pr={2}
        >
          
          {tag}
        </Box>
        <Card
          ml={2}
          px={2}
          Flex
          className="center"
          borderRadius={50}
          bg={pilColor}
          width={1/3}
        >
          {count}
        </Card>
      </Flex>
      </Card>
    </Link>
    )
  }
  
}

export class TagsList extends React.Component {
  render() {
    const {
      seenGroup
    } = this.props;
    return (
      <Flex justifyContent='center' px={10} flexWrap='wrap' mx={-2} >
        {Object.entries(seenGroup).map(([fieldValue, totalCount]) => (
              <TagPil key={fieldValue} tag={fieldValue} count={totalCount} />
        ))}
      </Flex>
    )

  }
}


class Tags extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const blogGroup = get(this, 'props.data.allContentfulBlogPost.group')
    const contentGroup = get(this, 'props.data.allContentfulGenericContent.group')
    const group = union(blogGroup, contentGroup)
    let seen = new Set();
    let seenGroup = {}
    group.map( tag => {
      if (seen.has(tag.fieldValue)){
        seenGroup[tag.fieldValue] += tag.totalCount
      } else {
        seen.add(tag.fieldValue)
        seenGroup[tag.fieldValue] = tag.totalCount
      }
    })
    const views = get(this, 'props.data.allContentfulView.edges')
    return (
      <Layout views={views} location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Tags</div>
          <div className="wrapper">
            <TagsList seenGroup={seenGroup} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulView(limit: 10) {
      edges {
        node {
          title
          slug
          appearInNav
        }
      }
    }
    allContentfulGenericContent(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
    allContentfulBlogPost(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`
