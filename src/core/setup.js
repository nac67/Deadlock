//LISTENERS
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.setAttribute("width",WIDTH);
canvas.setAttribute("height",HEIGHT);
