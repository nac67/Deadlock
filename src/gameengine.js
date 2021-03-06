var game;

init();

function init () {
    Content.createLoader();

    //preload assets
    Content.preloadImage('images/locked.png');
    Content.preloadImage('images/selected.png');
    Content.preloadFilm('images/Barrier.png', 40, 40, 9, 3);
    Content.preloadFilm('images/Mutex.png', 40, 40, 6, 3);
    Content.preloadFilm('images/Semaphore.png', 40, 40, 21, 5);
    Content.preloadFilm('images/StartGate.png', 40, 40, 4, 2);
    Content.preloadFilm('images/Thread.png', 40, 40, 1, 1);
    Content.preloadFilm('images/ThreadWaiting.png', 40, 40, 59, 8);

    Content.loadThenStart(startGame);
}

function startGame () {
    game = new GameplayController();
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