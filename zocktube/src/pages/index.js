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
      <div>
      <form noValidate="novalidate" className="push-down">
        <div className="form-group">
          <label for="animeName">Search Anime</label>
          <input type="email" className="form-control push-down" id="animeName" aria-describedby="Anime Name" placeholder="Enter Anime Name"/>
          <button type="button" className="btn btn-primary float-right">Enter</button>
        </div>
      </form>
      </div>
    </div>
  </Layout>
)

export default IndexPage
