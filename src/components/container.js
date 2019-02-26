import React from 'react'
import Helmet from 'react-helmet'

export default ({ children }) => (
  <div style={{ maxWidth: 1180, margin: '0 auto' }}>
  <Helmet name="apple-mobile-web-app-capable" content="yes" />
  <Helmet name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta ></meta>
    {children}
  </div>
)