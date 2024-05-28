var socket = io.connect('http://localhost:3010', {'forceNew': true});
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data) {
    var username = localStorage.getItem('username');
    var html = data.map(function(elem, index){
        var ownClass = elem.autor === username ? 'own' : 'other';
        var bubbleClass = elem.autor === username ? 'ownBubble' : 'otherBubble';
        var iconSrc = elem.autor === username 
            ? 'https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png'
            : 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png';
        
        return (`
            <div class="bubbleWrapper">
                <div class="inlineContainer ${ownClass}">
                    <img class="inlineIcon" src="${iconSrc}">
                    <div class="${bubbleClass} ${ownClass}">
                        <strong>${elem.autor}</strong>: ${elem.texto}
                    </div>
                </div>
            </div>
        `);
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var payload = {
        autor: document.getElementById('username').value,
        texto: document.getElementById('texto').value
    };
    socket.emit('new-message', payload);
    return false;
}
