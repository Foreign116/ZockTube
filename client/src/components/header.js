import PropTypes from "prop-types"
import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css'
import { NavDropdown } from 'react-bootstrap'



const Header = ({ siteTitle,socket }) => {
  const [anime, setAnime] = useState("");
  const [clients, setClients] = useState([]);
  const [ep, setEp] = useState("");

  useEffect(() => {
    socket.on("new users", ({users}) =>{
      setClients(users)
  })
    return () => {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("incoming data", {name:anime, episode:Number(ep)});
    setAnime("");
    setEp("");
  }

  return(
  <header className="header">
    <div className="container header-content">
      <nav className="navbar">
        <a className="navbar-brand" href="/"><h1>{siteTitle}</h1></a>
        <NavDropdown title="Connected" className="font-weight-normal" id="basic-nav-dropdown">
          {clients.map(({ userName }) => <NavDropdown.Item className="font-weight-normal" as="span">{userName}</NavDropdown.Item>)}
        </NavDropdown>
        <form className="form-inline" onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => setAnime(e.target.value)} value={anime} className="form-control" id="animeSearch" type="text" placeholder="Enter Anime Name" aria-label="Enter Anime Name"/>
          <input onChange={(e) => setEp(e.target.value)} value={ep} className="form-control left-space" id="epSearch" type="text" placeholder="Enter Anime Episode" aria-label="Enter Anime Episode"/>
          <button onClick={(e) => handleSubmit(e)} className=" left-space btn text-white btn-outline-dark" type="submit">Enter</button>
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
