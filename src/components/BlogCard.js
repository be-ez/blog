import React from "react"
import PropTypes from "prop-types"

import Card from '@react-mdc/card';
// import Typography from '@react-mdc/typography';

const BlogCard = ({ children }) => (
  <Card>
    <Card.SupportingText>
      {children}
    </Card.SupportingText>
  </Card>
)

export default BlogCard
