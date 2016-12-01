var $ = require('jquery');
var PIXI = require('pixi.js');


$(document).ready(function() {
    var renderer = PIXI.autoDetectRenderer(256, 256);
    console.log('hi');
    document.body.appendChild(renderer.view);
    var stage = new PIXI.Container();

    renderer.render(stage);
});

function displayMaze(maze) {

}
