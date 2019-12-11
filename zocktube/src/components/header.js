import PropTypes from "prop-types"
import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css'

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="container header-content">
      <nav className="navbar">
        <a className="navbar-brand">{siteTitle}</a>
        <form className="form-inline">
          <input className="form-control" id="animeSearch" type="text" placeholder="Search" aria-label="Search"/>
          <button className="btn text-white btn-outline-dark" type="submit">Search</button>
        </form>
      </nav>
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
