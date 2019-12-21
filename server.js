const express = require("express");
const Anime = require('anime-scraper').Anime
const path = require("path")
const port = process.env.PORT || 3000;
const host = "0.0.0.0"
const app = express();
let serverClients = []
let clientClients = []


app.use(express.static(path.join(__dirname, 'client/public')));


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

const server = app.listen(port, host, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server);



//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
  socket.on("user Connected", (name) => {
    const newServerClient = {userName: name, id:socket.id};
    const newClient = {userName: name}
    serverClients.push(newServerClient)
    clientClients.push(newClient)
    io.emit("new users", {users:clientClients})
  })

  socket.on("incoming message", ({user, message}) => {
    io.emit("outgoing message", {user:user, newMessage:message})
  })

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", ({name,episode})=>{
      Anime.fromName(name).then(function (anime) {
        const title = anime.name;
        anime.episodes[episode-1].fetch().then(function (e) {
          const animeurl = e.videoLinks[2].url
          const ep = e.name;
          io.emit("outgoing data", {url: animeurl, ep:ep, title:title });
          
        })
      })
    });


    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => {
      let index = -10;
      let userName= "";
      for(let i=0; i<serverClients.length; i++){
        if(serverClients[i].id === socket.id){
          index = i;
          userName = serverClients[i].userName;
          break;
        }
      }
      if(index !== -10){
        serverClients.splice(index, 1);
      }

      index = -10;

      if(userName !== ""){
      for(let i=0; i< clientClients.length; i++) {
        if(clientClients[i].userName === userName){
          index = i;
          break;
        }
      }
      clientClients.splice(index, 1);
      io.emit("new users", {users:clientClients})
    }
    });
});