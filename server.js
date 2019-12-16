const express = require("express");
const Anime = require('anime-scraper').Anime
const path = require("path")
const port = process.env.PORT || 3000;
const host = "0.0.0.0"
const app = express();


app.use(express.static(path.join(__dirname, 'client/public')));


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

const server = app.listen(port, host, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server);



//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {

  io.emit("check username")

  socket.on("user Connected", (name) => {
    socket.broadcast.emit("new user", {user:name})
  })

  socket.on("incoming message", ({user, message}) => {
    io.emit("outgoing message", {user:user, newMessage:message})
  })

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", ({name,episode})=>{
      Anime.fromName(name).then(function (anime) {
        anime.episodes[episode-1].fetch().then(function (e) {
          const animeurl = e.videoLinks[3].url
          io.emit("outgoing data", {url: animeurl});
          
        })
      })
    });


    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});