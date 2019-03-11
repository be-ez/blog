import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'


function NavIfProps({views}) {
  const links = []
  if(views){
    views.map(({ node }) => {
    if (node){
      if (node.appearInNav){
        links.push(
          <li key={node.slug} className={styles.navigationItem}>
            <Link to={"/"+node.slug}>{node.slug}</Link>
          </li>
        )
      }
    }
  })}
return links
}

class nav extends React.Component {
  render() {
    const { views } = this.props

    return (
      <nav role="navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/">🏡</Link>
        </li>
        <NavIfProps views={views} />
        <li className={styles.navigationItem}>
          <Link to="/tags/">🏷</Link>
        </li>
      </ul>
    </nav>
    )
  }
}

export default nav




