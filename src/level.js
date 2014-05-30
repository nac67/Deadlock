var Level = function () {
    this.zones = [];
    this.threads = [];
    this.paths = null;
    this.locks = [];


    this.loadLevel = function (path) {
        this.paths = new ThreadPaths();
        this.paths.addTurn(1,1,DirEnum.RIGHT,0);
        this.paths.addTurn(6,1,DirEnum.DOWN,0);
        this.paths.addTurn(6,13,DirEnum.LEFT,0);
        this.paths.addTurn(1,13,DirEnum.UP,0);

        this.paths.addTurn(2,2,DirEnum.RIGHT,1);
        this.paths.addTurn(5,2,DirEnum.DOWN,1);
        this.paths.addTurn(5,12,DirEnum.LEFT,1);
        this.paths.addTurn(2,12,DirEnum.UP,1);

        var z = new Zone(4,4,4,7);
        this.zones.push(z);

        var thread0 = new Thread(0);
        thread0.hardSetPos(1,7);
        var thread1 = new Thread(1);
        thread1.hardSetPos(2,7);
        this.threads.push(thread0);
        this.threads.push(thread1);

        //thread0.filmplayer.swapFilm("waiting");
    }
}