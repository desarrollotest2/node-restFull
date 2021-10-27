const express = require("express");
const bodyParser = require('body-parser');

const port = 7000;

const server = new express();
server.use(bodyParser.json);

let respuesta ={
    error: false,
    codigo: 200,
    mensaje: ''
};

server.get('/', function(request, response){
    respuesta ={
        error: false,
        codigo: 200,
        mensaje: ' Servicio git raiz no utilizar'
    };
    response.send(respuesta);
});

server.listen(port, () => {
    console.log("Servidor iniciado -> " + port);
});