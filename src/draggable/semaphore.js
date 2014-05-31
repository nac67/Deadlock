var SemaphoreType = {P:0, V:1};

var Semaphore = function (x,y) {
    this.x = x;
    this.y = y;

    this.color = COLOR.RED;
    this.type = SemaphoreType.P;
    this.displayNumber = -1;

    this.filmplayer = new Filmplayer();
    var defaultFilm = Content.getFilm('images/Semaphore.png');
    this.filmplayer.addFilmStrip("default",defaultFilm);
    this.filmplayer.paused = true;

    this.draw = function () {
        if(this.displayNumber == -1){
            //this means its a V or that game is in staging mode
            this.filmplayer.setFrame(this.type*18+this.color);
        }else{
            //game must be in simulation mode and it must be a P
            this.filmplayer.setFrame((5-this.displayNumber)*3+this.color);
        }
        Draggable.prototype.draw.call(this);  
    }
}
Mutex.prototype = new Draggable();