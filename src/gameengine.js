var x = 300;
var y = 300;
var ratFilmPlayer;

var threads;

var carrotBmp;

init();

function init () {
    Content.createLoader();

    //preload assets
    carrotBmp = Content.preloadImage('images/carrot.png');
    var runFilm = Content.preloadFilm('images/rat.png', 30, 110, 50, 6);
    var spazFilm = Content.preloadFilm('images/Spazout.png', 60, 110, 50, 8);

    //you can create the filmplayer here, or after preloading. It doesn't matter.
    ratFilmPlayer = new Filmplayer();
    ratFilmPlayer.addFilmStrip("running", runFilm);
    ratFilmPlayer.addFilmStrip("spazzing", spazFilm);

    Content.loadThenStart(startGame);
}

function startGame () {
    threads = new ThreadPaths();
    threads.addTurn(1,1,DirEnum.RIGHT,0);
    threads.addTurn(5,1,DirEnum.DOWN,0);
    threads.addTurn(5,4,DirEnum.LEFT,0);
    threads.addTurn(1,4,DirEnum.UP,0);


    animate(); //begin self-calling animate function
}

function animate() {
    update();
    draw();
  
    // request new frame
    requestAnimFrame(function() {
        animate();
    });
}


function update() {

}

function draw () {
    var i;

    // Draw the background
    context.fillStyle = "#666666";
    context.fillRect(0,0,WIDTH,HEIGHT);

    // Draw the grid
    context.strokeStyle = "#949494";
    context.lineWidth = 1;
    context.beginPath();
    for(i=0.5;i<HEIGHT;i+=TILE){
        context.moveTo(0,i);
        context.lineTo(GAME_WIDTH,i);
    }
    for(i=0.5;i<GAME_WIDTH;i+=TILE){
        context.moveTo(i,0);
        context.lineTo(i,HEIGHT);
    }
    context.stroke();

    threads.draw();

    //ratFilmPlayer.draw(x,y);

    //context.drawImage(carrotBmp, 20, 20);
    //context.drawImage(Content.getImage("images/carrot.png"), 20, 40);
}