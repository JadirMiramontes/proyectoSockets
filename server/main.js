var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/',function(req,res){
    res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
    /*Aqui controlamos los eventos del cliente mediante sockets */
    socket.emit('messages', {
        id:1,
        texto: "Hola mundo, como estan, yo muy bien",
        autor: "Jadir Omar Miramontes Armendariz"
    });
});

server.listen(3010, function(){
    console.log("El Servidor esta corriendo en http://localhost:3010");
});