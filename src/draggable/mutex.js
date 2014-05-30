var MutexType = {LOCK:0, UNLOCK:1};

var Mutex = function (x,y) {
    this.x = x;
    this.y = y;
    this.filmplayer = new Filmplayer();
    var defaultFilm = Content.getFilm('images/Mutex.png');
    this.filmplayer.addFilmStrip("default",defaultFilm);
    this.filmplayer.paused = true;
    this.color = COLOR.RED;
    this.type = MutexType.LOCK;

    this.draw = function () {
        this.filmplayer.setFrame(this.type*3+this.color); //this is super hacky and i like it
        Draggable.prototype.draw.call(this);  
    }
}
Mutex.prototype = new Draggable();