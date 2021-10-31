const express = require("express");
const server = express();
const bodyParcer = require("body-parser");
server.use(bodyParcer.json());
const db = require("./conexion/bd");

db.initialize(function (dbCollection) {
    let empleado = {
        "primerNombre": "Juan",
        "primerApellido": "perez",
        "numeroDocumento": "123"
    };
    server.get("/", function (request, response) {
        dbCollection.find().toArray((error, result) => {
            if (error) {
                throw error;
            } else {
                response.json(result);
                response.statusCode = 200;
            }
        });
        //response.send("Servicio raiz");
    });

    server.get("/empleado/:id", function (request, response) {
        const idObj = request.params.id;
        if (idObj !== '') {
            const filtro = {
                "numeroDocumento": idObj
            };
            dbCollection.findOne(filtro, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    response.json(result);
                    //response.statusCode=202
                }
            }

            );
        } else {
            response.send("Usuario No encontrado");
        }

    });

    server.post("/empleado", function (request, response) {
        empleado = request.body;
        //response.send(empleado);
        dbCollection.insertOne(empleado, (error, Response) => {
            if (error) {
                throw error;
            } else {
                const filtro = {
                    "numeroDocumento": empleado.numeroDocumento
                };
                dbCollection.findOne(filtro, (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        response.json(result);
                    }
                } );

            }
        });
    });

    server.put("/empleado", function (request, response) {
        const filtro = {
            "numeroDocumento": request.body.numeroDocumento
        };
        dbCollection.updateOne(filtro,{$set:request.body},
            (error, result )=>{
                if(error){
                    throw error;
                }else{
                    dbCollection.findOne(filtro, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            response.json(result);
                        }
                    } );
                }
            });
        //response.send(empleado);
    });

    server.delete("/empleado/:id",
        function (request, response) {
            const idEmpleado = request.params.id;
            const filtro = {
                "numeroDocumento": idEmpleado
            };
            dbCollection.deleteOne(
                filtro, function(error, result){
                    if (error) {
                        throw error;
                    } else {
                        response.send("Borrado");

                    }
                });
        });
});
const port = 4000;


server.listen(port, () => {
    console.log("Subio server ->" + port);
});