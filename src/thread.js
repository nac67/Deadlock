var Thread = function (id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.dir = DirEnum.UP;

    this.filmplayer = new Filmplayer();
    this.filmplayer.frameDuration = 2;
    var defaultFilm = Content.getFilm('images/Thread.png');
    var waitingFilm = Content.getFilm('images/ThreadWaiting.png');
    this.filmplayer.addFilmStrip("default", defaultFilm);
    this.filmplayer.addFilmStrip("waiting", waitingFilm);

    this.draw = function () {
        this.filmplayer.draw(this.x*TILE,this.y*TILE);
    }
}