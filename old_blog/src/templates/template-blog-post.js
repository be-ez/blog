import React from "react"
import Link from "gatsby-link"

class BlogPostRoute extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <div>
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p>
            {post.timeToRead} min read &middot; {tagsSection}
          </p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
        <hr/>
        <p>
          <span>
            <small>
              {post.frontmatter.author}
            </small>
          </span>
        </p>
      </div>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug2($slug: String!) {
    markdownRemark {
      html
      timeToRead
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        author
      }
    }
  }
`
