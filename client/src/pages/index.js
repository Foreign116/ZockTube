import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"
import UserModal from "../components/modal"


const IndexPage = () => {
  return(
    <Layout>
      <SEO title="Home" />
      <UserModal/>
      <Video/>
    </Layout>
  )
}

export default IndexPage
