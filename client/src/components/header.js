import PropTypes from "prop-types"
import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css'



const Header = ({ siteTitle,socket }) => {
  const [anime, setAnime] = useState("");
  const [ep, setEp] = useState("");

  const handleSubmit = async () => {
    socket.emit("incoming data", {name:anime, episode:Number(ep)});
    setAnime("");
    setEp("");
  }

  return(
  <header className="header">
    <div className="container header-content">
      <nav className="navbar">
        <a className="navbar-brand" href="/"><h1>{siteTitle}</h1></a>
        <form className="form-inline">
          <input onChange={(e) => setAnime(e.target.value)} value={anime} className="form-control" id="animeSearch" type="text" placeholder="Enter Anime Name" aria-label="Enter Anime Name"/>
          <input onChange={(e) => setEp(e.target.value)} value={ep} className="form-control left-space" id="epSearch" type="text" placeholder="Enter Anime Episode" aria-label="Enter Anime Episode"/>
          <button onClick={handleSubmit} className=" left-space btn text-white btn-outline-dark" type="button">Enter</button>
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
