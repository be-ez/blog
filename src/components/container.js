import React from 'react'
import Helmet from 'react-helmet'

export default ({ children }) => (
  <div style={{ maxWidth: 1180, margin: '0 auto' }}>
    {children}
  </div>
)