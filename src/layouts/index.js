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
          span={2}
        >
        </LayoutGrid.Cell>
        <LayoutGrid.Cell
          span={8}
          style={{
            background: '#fff',
            color: 'black',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
          }}
        >
          {children()}
       </LayoutGrid.Cell>
        <LayoutGrid.Cell
          span={2}
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
