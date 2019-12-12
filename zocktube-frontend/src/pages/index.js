import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"

let socket = require('socket.io-client')('http://127.0.0.1:4001');


const IndexPage = (props) => {
  //starting speed at 0
let speed = 0;

//Simulating reading data every 100 milliseconds
setInterval(function () {
    //some sudo-randomness to change the values but not to drastically
    let nextMin = (speed-2)>0 ? speed-2 : 2;
    let nextMax = speed+5 < 140 ? speed+5 : Math.random() * (130 - 5 + 1) + 5;
    speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);

    //we emit the data. No need to JSON serialization!
    socket.emit('incoming data', speed);
}, 100);
  return(
  <Layout>
    <SEO title="Home" />
    <Video animeurl={props.animeurl}/>
  </Layout>
  )
}

export default IndexPage
