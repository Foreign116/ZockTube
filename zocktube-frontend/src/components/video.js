import React, { Component } from "react"

class Video extends Component {

  componentDidMount(){
    const { socket, animeurl} = this.props;
    socket.emit("incoming data", animeurl);
  }


  render() {
    const { animeurl } = this.props;
    return (
      <div className="container">
        <div className="push-down iframeWrapper">
          <iframe className="iframeWindow" src={`https://www.animebam.se${animeurl}`} frameBorder="0" allowFullScreen="allowFullScreen" title="Anime Video Iframe">
            <div className="inner-iframe"></div>
          </iframe>
        </div>
      </div>
      )
  }
}

export default Video;