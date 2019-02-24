import React from 'react'
import Link from 'gatsby-link'
import Toolbar from '@react-mdc/toolbar'

// no longer need routes until ..
// I generate toolbar or menu sections
// import routes from '../config/Routes';

const MainNav = () => (
  <nav>
    <Toolbar className={'toolbar'}>
      <Toolbar.Row>
        <Toolbar.Section align="start">
          <Link to="/" className={'toolbar-title'}>
            <Toolbar.Title className={'toolbar-title-text'}>
              Alex Shulman
            </Toolbar.Title>
          </Link>
        </Toolbar.Section>
        <Toolbar.Section align="end" className={'toolbar-menu'}>
          <Link
            to="/projects"
            className={'material-icons mdc-toolbar__icon toolbar-icon'}
            aria-label="info"
            alt="info"
          >
            work
          </Link>
          <Link
            to="/about"
            className={'material-icons mdc-toolbar__icon toolbar-icon'}
            aria-label="info"
            alt="info"
          >
            info_outline
          </Link>
        </Toolbar.Section>
      </Toolbar.Row>
    </Toolbar>
  </nav>
)

export default MainNav
