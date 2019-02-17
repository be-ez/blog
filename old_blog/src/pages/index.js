import React from "react";

import LayoutGrid from '@react-mdc/layout-grid';
import Typography from '@react-mdc/typography';

import BlogCard from "../components/BlogCard";
import BlogCardList from "../components/BlogCardList"

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <div>
        <Typography.Title>Posts</Typography.Title>
        <BlogCardList posts={posts} />
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          smallImage: frontmatter {
            image{
              childImageSharp {
                small: responsiveSizes(maxWidth: 292, maxHeight: 292) {
                  src
                  srcSet
                }
              }
            }
          }
          frontmatter {
            title
            path
            summary
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
