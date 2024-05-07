var express = require('express');
var app = express();

/* Como trabajaremos con socket, es recomendable usar el modulo HTTP para pasarle la app a express y manejar bien HTTP*/
var server = require('http').Server(app);

/* *Aqui estará toda la funcionalidad de los sockets
   *Se requiere la libreria socket.io
   *Se pasa la variable Server que tiene la app express y HTTP */
var io = require('socket.io')(server);

app.get('/',function(req,res){
    res.status(200).send("Hola Mundo");
});

server.listen(3010, function(){
    console.log("El Servidor esta corriendo en http://localhost:3010");
});