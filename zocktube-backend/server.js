const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const puppeteer = require('puppeteer');

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {
    console.log("New client connected");

    socket.on("changeStatus", (data) => {
      console.log(data);
      socket.broadcast.emit("changingStatus", {torf: data});
    })

    //Here we listen on a new namespace called "incoming data"
    socket.on("incoming data", (data)=>{
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        function getText(linkText) {
            linkText = linkText.replace(/\r\n|\r/g, "\n");
            linkText = linkText.replace(/\ +/g, " ");
          
            // Replace &nbsp; with a space 
            var nbspPattern = new RegExp(String.fromCharCode(160), "g");
            return linkText.replace(nbspPattern, " ");
          }

        async function findByLink(page, linkString) {
            const links = await page.$$('a')
            for (var i=0; i < links.length; i++) {
              let valueHandle = await links[i].getProperty('innerText');
              let linkText = await valueHandle.jsonValue();
              let aTag = await links[i].getProperty('href');
              let aTaglinkText = await aTag.jsonValue();
              const text = getText(linkText);
              if (linkString == text) {
                console.log(aTaglinkText,"returning link")
                return aTaglinkText;
              }
            }
            console.log("returning null")
            return null;
          }

        (async () => {
            console.log(data)
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(data, {waitUntil: 'networkidle0'});
            const links =  await findByLink(page, "Download");
            console.log(links)
            io.emit("outgoing data", {url: links});
            await browser.close();
          })();
    });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));