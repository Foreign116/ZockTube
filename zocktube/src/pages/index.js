import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <div className="push-down">  
        <iframe height='700' width='1200' src="https://www.youtube.com/embed/tp1ZluX4aYs" frameborder="0" allowFullScreen="allowFullScreen"></iframe>
      </div>
    </div>
  </Layout>
)

export default IndexPage
