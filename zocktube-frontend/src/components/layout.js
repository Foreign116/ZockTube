/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import io from "socket.io-client"
import Header from "./header"

let socket = io.connect('http://127.0.0.1:4001');

const Layout = (props) => {
  const [animeurl, setAnime] = useState("");

  socket.on("outgoing data", (data)=>{
    setAnime(data.url);
    console.log(data.url)
  });

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
