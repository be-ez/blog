import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styles from './article-preview.module.css'

export default ({ article, slug }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={article.heroImage.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/${slug}/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
    {article.tags.map(tag => (
      <Link to={'/tags/' + tag} className={styles.tag} key={tag}>
        {tag}
      </Link>
    ))}
  </div>
)
