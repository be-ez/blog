import React from "react"
import { Link, graphql } from "gatsby"
import {
  Card,
} from 'rebass'
import styles from '../ArticlePreview/article-preview.module.css'

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
      <Card
        p={3}
        width={[1]}
        border={'solid'}
        borderColor={'black'}
        borderRadius={8}
      >
        <LinkIfParentSlug
          parent_slug={slug}
          slug={content.slug}
          title={content.title}
        />
        <small>{content.createdAt}</small>
        {/* <RichText document={content.body.content[0]} /> */}
        <div
                dangerouslySetInnerHTML={{
                  __html: content.body.childContentfulRichText.html,
                }}
              />
        <br />
        <div>
          {(content.tags || []).map(tag => (
            <Link to={'/tags/' + tag.toLowerCase()} className={styles.tag} key={content.slug+tag}>
              {tag}
            </Link>
          ))}
        </div>
      </Card>
    )
  }
  return (
    <div>
      <LinkIfParentSlug
          parent_slug={slug}
          slug={content.slug}
          title={content.title}
        />
    </div>
  )
}
export default ContentfulContent

export const genericContentFragment = graphql`
  fragment GenericContentFragment on ContentfulGenericContent  {
    title
    createdAt(formatString: "MMMM Do, YYYY")
    slug
    tags
    body {
      id
      nodeType
      childContentfulRichText{
        html
      }
      content {
        nodeType
        content {
          nodeType
          value
        }
        data{
          target{
            fields{
              file{
                en_US {
                  url
                  fileName
                  contentType
                }
              }
            }
          }
        }
      }
    }
  }
`
