import PropTypes from "prop-types"
import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css'
import {animeUrl} from './crawler'


const Header = ({ siteTitle, callBackAnime }) => {
  const [anime, setAnime] = useState("");

  const handleSubmit = async () => { 
    await animeUrl(anime, callBackAnime);
    setAnime("")
  }

  return(
  <header className="header">
    <div className="container header-content">
      <nav className="navbar">
        <a className="navbar-brand" href="/"><h1>{siteTitle}</h1></a>
        <form className="form-inline">
          <input onChange={(e) => setAnime(e.target.value)} value={anime} className="form-control" id="animeSearch" type="text" placeholder="Enter Anime URL" aria-label="Enter Anime URL"/>
          <button onClick={handleSubmit} className=" button-left-space btn text-white btn-outline-dark" type="button">Enter</button>
          <a className="text-white btn btn-outline-info button-left-space" target="_blank" href="https://www.animebam.se/series">Find Anime Here!</a>
        </form>
      </nav>
    </div>
  </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
