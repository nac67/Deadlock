var Level = function () {
    this.zones = [];
    this.threads = [];
    this.paths = null;
    this.locks = [];
    this.gates = [];

    this.mutexKeys = [0,0,0];        //how many keys should the level start with
    this.semaphoreKeys = [0,0,0];    //what should be the initial semaphore count
    this.neededAtBarrier = [0,0,0];  //how many things are needed to pass a barrier
    this.atBarrier = [0,0,0];        //how many are currently at the barrier

    this.neededLaps = 0;             //how many laps are needed to win


    this.loadLevel = function (path) {
        this.mutexKeys = [1,1,1];
        this.semaphoreKeys = [2,0,0];
        this.neededAtBarrier = [3,3,3];

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

        this.setStartGate(1,7,DirEnum.UP);
        this.setStartGate(2,7,DirEnum.UP);

        var l  = new Mutex(5,4);
        var l2 = new Mutex(6,4);
        var l3 = new Mutex(5,10);
        var l4 = new Mutex(6,10);
        l3.type = MutexType.UNLOCK;
        l4.type = MutexType.UNLOCK;

        this.locks.push(l);
        this.locks.push(l2);
        this.locks.push(l3);
        this.locks.push(l4);


        var s = new Semaphore(8,4);
        var s2 = new Semaphore(8,5);
        s2.color = COLOR.GREEN;
        s2.type = SemaphoreType.V;
        this.locks.push(s);
        this.locks.push(s2);

        var b = new Barrier(10,4);
        b.count = 4;
        b.color = COLOR.BLUE;
        this.locks.push(b);

        this.neededLaps = 3;


        //thread0.filmplayer.swapFilm("waiting");
    }

    /*this.loadLevel = function (path) {

        this.mutexKeys = [1,1,1];
        this.semaphoreKeys = [2,0,0];
        this.neededAtBarrier = [3,3,3];

        this.paths = new ThreadPaths();
        this.paths.addTurn(1,1,DirEnum.RIGHT,0);
        this.paths.addTurn(6,1,DirEnum.DOWN,0);
        this.paths.addTurn(6,13,DirEnum.LEFT,0);
        this.paths.addTurn(1,13,DirEnum.UP,0);

        this.paths.addTurn(2,2,DirEnum.RIGHT,1);
        this.paths.addTurn(5,2,DirEnum.DOWN,1);
        this.paths.addTurn(5,12,DirEnum.LEFT,1);
        this.paths.addTurn(2,12,DirEnum.UP,1);

        this.paths.addTurn(0,0,DirEnum.RIGHT,2);
        this.paths.addTurn(7,0,DirEnum.DOWN,2);
        this.paths.addTurn(7,14,DirEnum.LEFT,2);
        this.paths.addTurn(0,14,DirEnum.UP,2);

        this.setStartGate(1,7,DirEnum.UP);
        this.setStartGate(2,7,DirEnum.UP);
        this.setStartGate(0,7,DirEnum.UP);




        var s1 = new Semaphore(0,0);
        var s2 = new Semaphore(1,1);
        var s3 = new Semaphore(2,2);

        var s4 = new Semaphore(5,10);
        var s5 = new Semaphore(6,10);
        var s6 = new Semaphore(7,10);
        this.locks.push(s1);
        this.locks.push(s2);
        this.locks.push(s3);
        this.locks.push(s4);
        this.locks.push(s5);
        this.locks.push(s6);

        s4.type = SemaphoreType.V;
        s5.type = SemaphoreType.V;
        s6.type = SemaphoreType.V;

        this.neededLaps = 3;


        //thread0.filmplayer.swapFilm("waiting");
    }*/

    this.loadLevel = function (path) {

        this.mutexKeys = [1,1,1];
        this.semaphoreKeys = [2,0,0];
        this.neededAtBarrier = [3,3,3];

        this.paths = new ThreadPaths();
        this.paths.addTurn(1,1,DirEnum.RIGHT,0);
        this.paths.addTurn(6,1,DirEnum.DOWN,0);
        this.paths.addTurn(6,13,DirEnum.LEFT,0);
        this.paths.addTurn(1,13,DirEnum.UP,0);

        this.paths.addTurn(2,2,DirEnum.RIGHT,1);
        this.paths.addTurn(5,2,DirEnum.DOWN,1);
        this.paths.addTurn(5,12,DirEnum.LEFT,1);
        this.paths.addTurn(2,12,DirEnum.UP,1);

        this.paths.addTurn(0,0,DirEnum.RIGHT,2);
        this.paths.addTurn(7,0,DirEnum.DOWN,2);
        this.paths.addTurn(7,14,DirEnum.LEFT,2);
        this.paths.addTurn(0,14,DirEnum.UP,2);

        this.setStartGate(1,7,DirEnum.UP);
        this.setStartGate(2,7,DirEnum.UP);
        this.setStartGate(0,7,DirEnum.UP);




        var s1 = new Barrier(0,0);
        var s2 = new Barrier(1,1);
        var s3 = new Barrier(2,2);

        var s4 = new Barrier(5,10);
        var s5 = new Barrier(6,10);
        var s6 = new Barrier(7,10);
        this.locks.push(s1);
        this.locks.push(s2);
        this.locks.push(s3);
        this.locks.push(s4);
        this.locks.push(s5);
        this.locks.push(s6);

        this.neededLaps = 3;


        //thread0.filmplayer.swapFilm("waiting");
    }

    this.setStartGate = function (x,y,dir) {
        var thread = new Thread();
        thread.hardSetPos(x,y);
        thread.dir = dir;
        this.threads.push(thread);
        this.gates.push([x,y,dir]);
    }

    this.isStartGate = function(x,y){
        return this.gates.some(function (gate,i,arry) {
                return gate[0] === x && gate[1] ===y;
            });

    }

    this.getLockAt = function(x,y){
        var l;
        for (var i = 0; i < this.locks.length; i++) {
            l = this.locks[i];
            if(l.x === x & l.y === y) return l;
        };
        return null;
    }

}