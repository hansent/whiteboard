var $ = require('jquery');
var io = require('socket.io-client');

var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

APP = {
    lastPos: null
};

var socket = io();

socket.on('init', function(data){
    APP.color = data.color;
    data.state.forEach(renderPath);
});

socket.on('addPath', function(path){
    console.log('addPath', path);
    renderPath(path);
})


var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();    



function renderPath(path){
    ctx.strokeStyle= path.color;
    ctx.beginPath();
    ctx.moveTo(path.from.x, path.from.y);    
    ctx.lineTo(path.to.x, path.to.y);
    ctx.stroke();    
}


function onMouseDown(ev){
    APP.lastPos = {x: ev.clientX, y: ev.clientY};
}

function onMouseMove(ev){
    var newPos = {x: ev.clientX, y: ev.clientY};
    if (APP.lastPos != null){
        socket.emit('addPath', {from: APP.lastPos, to: newPos});
        APP.lastPos = newPos;
    }
}

function onMouseUp(ev){
    var newPos = {x: ev.clientX, y: ev.clientY};
    if (APP.lastPos){
        socket.emit('addPath', {from: APP.lastPos, to: newPos});
    }
    APP.lastPos = null;
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
