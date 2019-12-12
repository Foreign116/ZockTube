/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = (props) => {
  const [animeurl, setAnime] = useState("");

  const callBackAnime = (url) => {
    setAnime(url)
    console.log(animeurl)
  }

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
      })
    );

  return (
    <>
    <div className="site">
      <Header callBackAnime={callBackAnime} siteTitle={data.site.siteMetadata.title} />
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
