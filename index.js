const express = require("express");
const bodyParser = require('body-parser');

const port = 4000;

const server = new express();

server.listen(port, () => {
    console.log("Servidor iniciado -> " + port);
});