var Draggable = function () {
    this.x = 0;
    this.y = 0;
    this.dragging = false; //are you currently moving it around, or is it settled?


}

Draggable.prototype.draw = function () {
    var alpha = (this.dragging ? .5 : 1);
    this.filmplayer.draw(this.x*TILE, this.y*TILE, alpha);
}