import React from "react"
import get from 'lodash/get'
import Layout from "../components/layout"


class Dev extends React.Component {
  render() {
    // const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const views = get(this, 'props.data.allContentfulView.edges')
    // const [author] = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location}>
          <div className="wrapper">
            LETS WORK OUT
            <div>
            {views.map(({ node }) => {
                return (
                  <ul key={node.slug}>
                    {node.title}
                    {/* <ArticlePreview article={node} /> */}
                  </ul>
                )
              })}
            </div>
          </div>
      </Layout>
      // <Layout location={this.props.location}>
      //   <div style={{ background: '#fff' }}>
      //     <Helmet title={siteTitle} />
      //     <Hero data={author.node} />
      //     <div className="wrapper">
      //       <h2 className="section-headline">Recent articles</h2>
      //       <ul className="article-list">
      //         {posts.map(({ node }) => {
      //           return (
      //             <ul key={node.slug}>
      //               <ArticlePreview article={node} />
      //             </ul>
      //           )
      //         })}
      //       </ul>
      //     </div>
      //   </div>
      // </Layout>
    )
  }
}

export default Dev

export const pageQuery = graphql`
  query {
    allContentfulView(limit: 10) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
