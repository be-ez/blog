import React from 'react'
import base from './base.css'
import Container from '../Container'
import Navigation from '../Navigation'

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
