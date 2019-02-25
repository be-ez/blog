import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
// import Card from '@react-mdc/card';
import Typography from '@react-mdc/typography'
import List from '@react-mdc/list'
import Button from '@react-mdc/button'
import Elevation from '@react-mdc/elevation'
import LayoutGrid from '@react-mdc/layout-grid'

const BlogCardList = ({ posts }) => (
  <div className="mdc-grid-list mdc-grid-list--header-caption">
    <ul className="mdc-grid-list__tiles">
      {posts.map(post => (
        <LayoutGrid key={post.node.frontmatter.path}>
          <LayoutGrid.Cell span={6}>
            <Elevation
              zSpace={10}
              style={{
                margin: '5px',
              }}
            >
              <li
                className="mdc-grid-tile"
                style={{
                  width: '400px',
                  margin: '0px',
                }}
              >
                <Link
                  to={post.node.frontmatter.path}
                  className="mdc-grid-tile__title"
                  style={{
                    paddingTop: '10px',
                    textDecoration: 'none',
                    wordWrap: 'normal',
                    textOverflow: 'none',
                  }}
                >
                  <div className="mdc-grid-tile__primary">
                    <img
                      className="mdc-grid-tile__primary-content"
                      src={post.node.smallImage.image.childImageSharp.small.src}
                    />
                  </div>
                  <Button
                    style={{
                      width: 'auto',
                      height: 45,
                    }}
                  >
                    {post.node.frontmatter.title}
                  </Button>
                </Link>
              </li>
            </Elevation>
          </LayoutGrid.Cell>
          <LayoutGrid.Cell span={6}>
            <Typography.Caption>
              {post.node.frontmatter.summary}
            </Typography.Caption>
          </LayoutGrid.Cell>
        </LayoutGrid>
      ))}
    </ul>
  </div>
)

export default BlogCardList
