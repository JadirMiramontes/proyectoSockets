/*Creamos la variable que permitira al frontend conextarse a nuestro backend */
var socket = io.connect('http://localhost:3010',{'forceNew':true});

/*Esto manda al servidor el mensaje de connect y aparece en console.log */