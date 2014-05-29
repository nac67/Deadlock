var game;
var filmstrips = {};

init();

function init () {
    Content.createLoader();

    //preload assets
    Content.preloadImage('images/locked.png');
    Content.preloadImage('images/selected.png');
    filmstrips['Barrier']   = Content.preloadFilm('images/Barrier.png', 40, 40, 9, 3);
    filmstrips['Mutex']     = Content.preloadFilm('images/Mutex.png', 40, 40, 6, 3);
    filmstrips['Semaphore'] = Content.preloadFilm('images/Semaphore.png', 40, 40, 21, 5);
    filmstrips['StartGate'] = Content.preloadFilm('images/StartGate.png', 40, 40, 4, 2);
    filmstrips['Thread']    = Content.preloadFilm('images/Thread.png', 40, 40, 1, 1);
    filmstrips['ThreadWaiting']= Content.preloadFilm('images/ThreadWaiting.png', 40, 40, 59, 8);

    //you can create the filmplayer here, or after preloading. It doesn't matter.
    /*ratFilmPlayer = new Filmplayer();
    ratFilmPlayer.addFilmStrip("running", runFilm);
    ratFilmPlayer.addFilmStrip("spazzing", spazFilm);*/

    Content.loadThenStart(startGame);
}

function startGame () {
    game = new GameplayController(filmstrips);
    animate(); //begin self-calling animate function
}

function animate() {
    game.update();
    game.draw();
  
    // request new frame
    requestAnimFrame(function() {
        animate();
    });
}