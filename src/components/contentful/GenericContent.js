import React from "react"
import { Link, graphql } from "gatsby"
import styles from '../article-preview.module.css'

function LinkIfParentSlug({parent_slug, slug, title}){
  if (parent_slug){
    return (
      <h3 className={styles.previewTitle}>
        <Link to={`/${parent_slug}/${slug}`}>{title}</Link>
      </h3>
    )
  }
  return (
    <h1>{title}</h1>
  )
}

function ContentfulContent({content, slug}) {
  if (content.body){
    return (
      <div>
        <LinkIfParentSlug
          parent_slug={slug}
          slug={content.slug}
          title={content.title}
        />
        <div
                dangerouslySetInnerHTML={{
                  __html: content.body.childContentfulRichText.html,
                }}
              />
      </div>
    )
  }
  return (
    <div>
      <h1>{content.title}</h1>
    </div>
  )
}
export default ContentfulContent

export const genericContentFragment = graphql`
  fragment GenericContentFragment on ContentfulGenericContent  {
    title
    slug
    body {
      childContentfulRichText {
          html
      }
    }
  }
`
