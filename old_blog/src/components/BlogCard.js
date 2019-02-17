import React from "react"
import PropTypes from "prop-types"

import Card from '@react-mdc/card';
// import Typography from '@react-mdc/typography';

const BlogCard = ({ children, srcUrl}) => (
  <Card>
    <Card.Media
        style={{
            backgroundImage: `url(${ srcUrl })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: 200,
            width: 300
        }} />
    <Card.SupportingText
        style={{
            "textAlign": "center"
        }}
    >
      {children}
    </Card.SupportingText>
  </Card>
)

export default BlogCard
