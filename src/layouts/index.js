import React from "react"
import PropTypes from "prop-types"

import LayoutGrid from '@react-mdc/layout-grid';
import Typography from '@react-mdc/typography';
import Theme from '@react-mdc/theme';

import MainNav from '../components/MainNav';

import "../styles/main.scss"

const Layout = ({ children }) => (
  <Theme>
    <Typography>
      <MainNav />
      <LayoutGrid style={{ background: '#fff' }}>
        <LayoutGrid.Cell
          span={1}
        >
        </LayoutGrid.Cell>
        <LayoutGrid.Cell
          span={10}
          style={{
            background: '#fff',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children()}
       </LayoutGrid.Cell>
        <LayoutGrid.Cell
          span={1}
        >
        </LayoutGrid.Cell>
      </LayoutGrid>
    </Typography>
  </Theme>
);

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
