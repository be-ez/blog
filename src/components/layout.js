import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import get from 'lodash/get'
import Container from './container'
import Navigation from './navigation'

class Template extends React.Component {
  render() {
    const { location, children, views } = this.props
    let header
    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }
    return (
      <Container>
        <Navigation views={views}/>
        {children}
      </Container>
    )
  }
}

export default Template
