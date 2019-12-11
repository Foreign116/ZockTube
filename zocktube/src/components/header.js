import PropTypes from "prop-types"
import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css'

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="container header-content">
      <h1>{siteTitle}</h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
