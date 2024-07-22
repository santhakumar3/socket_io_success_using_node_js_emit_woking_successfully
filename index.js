// console.log("Hello Santha!!! Welcome to Node JS");
// console.log("welcome to chennai for the better understand!!!")

require('dotenv').config();
// const PORT = process.env.PORT;
const PORT = 3000;
const express = require("express");
const socketIO = require("socket.io");
const axios = require('axios');
const { response } = require("express");

const server = express().listen(PORT, ()=> {
    console.log(`Listining to ${PORT}`);
});

const socketHandler = socketIO(server);

socketHandler.on("connection", (socket)=>{

    socket.on('disconnect', () => {
        console.log("Client Disconnected!");
    });

    console.log("Client Connected!");

    // setInterval(()=> {
        socketHandler.emit('crypto', "Hello Crypto Client!");
    // }, 1000);

});


// Make a request for a user with a given ID
const getPrices = () => { axios
.get(
    "https://jsonplaceholder.typicode.com/posts/"
    // process.env.LIST_URL
    )
  .then((response) => {
    // handle success
    // console.log(response.data);

    const priceList = response.data.map((item) => {
        return {
            id: item.id,
            name: item.title,
            // price: item.matrics.market_data.price_usd,
            description: item.body,
        }
    })

    // console.log(priceList);
    socketHandler.emit("crypto", priceList);

  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });

};

setInterval(() => {
getPrices();
},5000)