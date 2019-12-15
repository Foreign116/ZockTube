import React, { Component } from "react"
import Iframe from 'react-iframe'

class Video extends Component {
  render() {
    const { animeurl } = this.props;
    return (
      <div className="container">
          <Iframe url={animeurl} scrolling="no" allowFullScreen position="absolute" width="50%" height="50%"/>
      </div>
      )
  }
}

export default Video;