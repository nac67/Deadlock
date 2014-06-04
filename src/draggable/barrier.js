var Barrier = function (x,y) {
    this.x = x;
    this.y = y;

    this.color = COLOR.RED;
    this.displayNumber = 3;

    this.filmplayer = new Filmplayer();
    var defaultFilm = Content.getFilm('images/Barrier.png');
    this.filmplayer.addFilmStrip("default",defaultFilm);
    this.filmplayer.paused = true;

    this.draw = function () {
        this.filmplayer.setFrame((this.displayNumber-2)*3+this.color); //this is super hacky and i like it
        Draggable.prototype.draw.call(this);  
    }
}
Mutex.prototype = new Draggable();