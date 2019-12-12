import React from "react"

const Video = (props) => {
  const { animeurl } = props;
  let url = "";
  if(animeurl){
    url =`https://www.animebam.se${animeurl}`;
  }
  else{
    url = "https://www.youtube.com/embed/tp1ZluX4aYs"
  }
    return (
    <div className="container">
      <div className="push-down iframeWrapper">
        <iframe src={url} frameborder="0" allowFullScreen="allowFullScreen" title="Anime Video Iframe"></iframe>
      </div>
    </div>
    )
}

export default Video;