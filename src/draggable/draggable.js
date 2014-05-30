var Draggable = function () {
    this.x = 0;
    this.y = 0;
    this.dragX = 0; //fine tune control, x,y stick to cell squares
    this.dragY = 0; 
    this.dragging = false; //are you currently moving it around, or is it settled?

    this.setXYToDrag = function () {
        this.x = Math.floor(this.dragX+.5);
        this.y = Math.floor(this.dragY+.5);
    }

    this.setDragToXY = function () {
        this.dragX = this.x;
        this.dragY = this.y;
    }
}