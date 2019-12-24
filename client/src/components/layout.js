/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import io from "socket.io-client"
import Header from "./header"
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

let socket = io.connect();

const Layout = (props) => {
  const [animeurl, setAnime] = useState("");
  const [title, setTitle] = useState("");
  const [ep, setEp] = useState("");


  useEffect(() => {
    socket.on("outgoing data", ({url, title, ep})=>{
      setAnime(url);
      setTitle(title);
      setEp(ep);
    });

    socket.on("changed url", ({nextUrl}) => {
      setAnime(nextUrl)
    })

    if(cookies.get('userName')){
      socket.emit("user Connected", cookies.get('userName'))
    }
    return () => {
       
      }
  }, []);


  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const {children} = props;
    const stateAsProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        animeurl: animeurl,
        socket: socket,
        cookies: cookies,
        title: title,
        ep: ep,
      })
    );

  return (
    <>
    <div className="site">
      <Header socket={socket} siteTitle={data.site.siteMetadata.title} />
        <div>
          <main className='site-content'>{stateAsProps}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
