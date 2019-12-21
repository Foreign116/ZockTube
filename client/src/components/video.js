import React, { Component } from "react"
import Iframe from 'react-iframe'
import ConnectBox from './connectBox'

class Video extends Component {
  render() {
    const { animeurl, socket, cookies, title, ep } = this.props;
    return (
      <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-10"><h2>{title}</h2></div>
                <div className="col-2"><h3>{ep}</h3></div>
              </div>
              <Iframe className="bigger-iframe" frameBorder="0" url={animeurl} scrolling="no" allowFullScreen position="absolute"/>
            </div>
            <div className="col-4">
              <ConnectBox cookies={cookies} socket={socket}/>
            </div>
          </div>
      </div>
      )
  }
}

export default Video;