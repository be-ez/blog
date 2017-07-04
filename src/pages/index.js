import React from "react";
import Link from "gatsby-link"

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <div>
        <h1 >Hi sassy friends</h1>
        <div>
        {posts.map(post =>
              <li key={post.node.frontmatter.path}>
                <span>
                  {post.node.frontmatter.date}
                </span>
                <Link to={post.node.frontmatter.path}>
                  {post.node.frontmatter.title}
                </Link>
              </li>
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
