import React from "react";
import Link from "gatsby-link";

import BlogCard from "../components/BlogCard";

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    //const json_posts = this.props.data.allPostsJson.edges
    console.log(this.props.data)
    return (
      <div>
        <h1 >Hi sassy friends</h1>
        <div>
        {posts.map(post =>
          <BlogCard key={post.node.frontmatter.path}>
                <span>
                  {post.node.frontmatter.smallImage}
                </span>
                <Link to={post.node.frontmatter.path}>
                  {post.node.frontmatter.title}
                </Link>
          </BlogCard>
        )}
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
