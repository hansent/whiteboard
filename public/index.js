var $ = require('jquery');

var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

APP = {
    paths: [],
    currentPath: null
};


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function onMouseDown(ev){
    APP.currentPath = [];
    
    APP.currentPath.push({x: ev.clientX, y: ev.clientY});
    APP.currentPath.push({x: ev.clientX, y: ev.clientY});
    APP.paths.push(APP.currentPath);
}

function onMouseMove(ev){
    console.log("move", ev);
    if (APP.currentPath){
        console.log("insert point", ev);
        APP.currentPath.push({x: ev.clientX, y: ev.clientY});   
    }
    
}

function onMouseUp(ev){
    console.log(APP.currentPath);
    APP.currentPath.push({x: ev.clientX, y: ev.clientY});
    APP.currentPath = null;    
}




canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, true);
canvas.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('resize', resizeCanvas, false);


function renderPath(path){
    var p = path[0];
    
    for(var i=1; i<path.length; i++){
         ctx.beginPath();
         ctx.moveTo(p.x, p.y);    
   
        p = path[i];
        ctx.lineTo(p.x, p.y);
        ctx.stroke();    
    }
    

    
}

function renderPaths(){
    for (var i = 0; i <APP.paths.length; i++) {
        renderPath(APP.paths[i]);
    };
}


function render(){
    renderPaths();
    //window.requestAnimationFrame(render);       
}

//window.requestAnimationFrame(render);
setInterval(render, 1000/30.0);

resizeCanvas();        










