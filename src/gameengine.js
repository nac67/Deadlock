var x = 300;
var y = 300;
var ratFilmPlayer;

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
    animate(); //begin self-calling animate function
}

function animate() {
    // update
    if(Key.isDown(Key.LEFT)){
        x -= 3;
    }
    if(Key.isDown(Key.RIGHT)){
        x += 3;
    }
    if(Key.isDown(Key.UP)){
        y -= 3;
    }
    if(Key.isDown(Key.DOWN)){
        y += 3;
    }


    if(Key.isDown(32)){
        ratFilmPlayer.swapFilm("spazzing");
    }else{
        ratFilmPlayer.swapFilm("running");
    }

    ratFilmPlayer.updateFrame();

    // draw
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,WIDTH,HEIGHT);
    ratFilmPlayer.draw(x,y);

    //this demonstrates the two ways to draw bitmaps,
    //   * using one that was returned from loadImage
    //   * fetching one from Content's cache
    context.drawImage(carrotBmp, 20, 20);
    context.drawImage(Content.getImage("images/carrot.png"), 20, 40);
  
    // request new frame
    requestAnimFrame(function() {
        animate();
    });
}
