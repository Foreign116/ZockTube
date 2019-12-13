import React, { Component } from "react"
import ReactPlayer from 'react-player'

class Video extends Component {
  state = {
    torf:false
  }

  componentDidMount(){
    const { socket } = this.props;
    socket.on("changingStatus", (data) =>{
      console.log("I am getting this", data.torf);
      this.setState({ torf : data.torf})
      console.log("This my state now after I got it", this.state.torf);
    })
  }

   changeStatusPlay = () => {
    const { socket } = this.props;
    socket.emit("changeStatus", true);
    this.setState({ torf : true})
    console.log("I emit this ",this.state.torf)
  }

  changeStatusPause = () => {
    const { socket } = this.props;
    socket.emit("changeStatus", false);
    this.setState({ torf : false})
    console.log("I emit this ",this.state.torf)
  }

  render() {
    const { animeurl } = this.props;
    return (
      <div className="container">
          <ReactPlayer onPause={this.changeStatusPause} onPlay={this.changeStatusPlay} url={animeurl}light playsinline controls playing={this.state.torf} />
      </div>
      )
  }
}

export default Video;