import React from "react";

import LayoutGrid from '@react-mdc/layout-grid';

import BlogCard from "../components/BlogCard";
import BlogCardList from "../components/BlogCardList"

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    console.log(posts)
    //const json_posts = this.props.data.allPostsJson.edges
    return (
      <div>
        <h1>Moving Targets</h1>
        <div>
          <BlogCardList posts={posts} />
        </div>
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
