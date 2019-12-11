import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"


const IndexPage = (props) => {
  return(
  <Layout>
    <SEO title="Home" />
    <Video animeurl={props.animeurl}/>
  </Layout>
  )
}

export default IndexPage
