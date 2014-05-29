var Thread = function (id) {
    this.id = id;
    this.player = null;
    this.x = 0;
    this.y = 0;
    this.dir = DirEnum.UP;
}