import * as PropTypes from "prop-types"
import React from "react"


class BlogTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object.isRequired,
    }),
  }
  render() {
    const post = this.props.data.markdownRemark

    return (
      // PostDetail is used for this detail page and
      // also in the modal.
     <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
    )
  }
}

export default BlogTemplate

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query PostPage($path: String!) {
    # Select the post which equals this id.
    markdownRemark(frontmatter: {path: {eq: $path }}) {
        html
        timeToRead
        frontmatter {
          title
          tags
          path
          date(formatString: "MMMM DD, YYYY")
          author
        }
      }
  }
`
