var Thread = function () {
    this.x = 0;
    this.y = 0;
    this.dir = DirEnum.UP;

    this.nextX = 0;
    this.nextY = 0;
    this.apparentX = 0;
    this.apparentY = 0;

    this.blocked = false;

    this.completedLaps = 0;

    this.filmplayer = new Filmplayer();
    this.filmplayer.frameDuration = 2;
    var defaultFilm = Content.getFilm('images/Thread.png');
    var waitingFilm = Content.getFilm('images/ThreadWaiting.png');
    this.filmplayer.addFilmStrip("default", defaultFilm);
    this.filmplayer.addFilmStrip("waiting", waitingFilm);


    this.hardSetPos = function (x,y) {
        this.x = x;
        this.y = y;
        this.nextX = x;
        this.nextY = y;
        this.apparentX = x;
        this.apparentY = y;
    }

    this.draw = function () {
        if(this.blocked){
            if(this.filmplayer.getFilm() === "default"){
                this.filmplayer.swapFilm("waiting");
                this.filmplayer.setFrame(0);
            }
        }else{
            this.filmplayer.swapFilm("default");
        }
        this.filmplayer.draw(this.apparentX*TILE,this.apparentY*TILE);
    }
}