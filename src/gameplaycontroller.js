var GameState = {STAGING: 0, SIMULATION:1};
var GameplayController = function () {
    this.level = new Level();
    this.lockController = new LockController(this.level);
    this.uiController = new UIController(this.level);
    this.level.loadLevel("put a path here");

    this.state = GameState.STAGING;


    //There are a few phases, at a large timestep, the threads actual position
    //because updates to what its apparent position is. It is at this point where
    //we make judgements about what should happen to that thread.
    //
    //During any other time between timesteps, the thread is traveling to its next position

    var timer = 0;
    this.update = function () {
        var lev = this.level, fraction;

        if(this.state === GameState.STAGING){
            this.uiController.processDragging();
        }
        else if(this.state === GameState.SIMULATION){
            if(timer == 0){
                timer = DELTA;
                
                this.calculateNextPositions();
                this.validatePositions();
                this.checkGameWin();
            }else{
                timer --;
                fraction = 1-timer/DELTA;
                this.interpolatePositions(fraction);
            }
            
        }
        this.lockController.setLockGraphics(this.state);

        if(Key.isDown(32)){
            this.state = GameState.SIMULATION;
        }
        
    }

    //use this to change DELTA
    this.hardSetDelta = function(val) {
        timer = val;
        DELTA = val;
    }

    // UPDATE helpers
    this.validatePositions = function () {
        var that = this;
        var valid = this.level.zones.every(function(elem,i,arr){
            return elem.isValid(that.level.threads)});

        if(!valid) {
            console.log("you lose the game!!!!");
        }
    }

    // This is the function that actually alters the game state
    // after execution of this function
    // you can consider the x,y to be the actual
    // current coordinates for sake of calculation.
    this.calculateNextPositions = function () {
        var i, t, turn, lev = this.level, that=this;

        function updateThread (thread) {
            //check lap first
            var addALap = !that.level.isStartGate(thread.x,thread.y) && 
                that.level.isStartGate(thread.nextX,thread.nextY);
            if(addALap) thread.completedLaps ++;

            //see if it should block
            that.lockController.processLocking(thread);

            thread.x = thread.nextX;
            thread.y = thread.nextY;
            thread.apparentX = thread.x;
            thread.apparentY = thread.y;

            turn = lev.paths.getDirection(thread.x,thread.y);
            if(turn !== null){
                thread.dir = turn;
            }

            

            if(!thread.blocked){
                if(thread.dir === DirEnum.UP) thread.nextY --;
                if(thread.dir === DirEnum.DOWN) thread.nextY ++;
                if(thread.dir === DirEnum.LEFT) thread.nextX --;
                if(thread.dir === DirEnum.RIGHT) thread.nextX ++;
            }
        }

        if(MOVE_SAME_TIME){
            for (i=0; i<lev.threads.length; i++) {
                this.lockController.processUnlocking(lev.threads[i]);
            }
            this.lockController.countThoseAtBarrier();

            for (i=0; i<lev.threads.length; i++) {
                updateThread(lev.threads[i]);
            }
        }else{
            var rand = Math.floor(Math.random()*lev.threads.length);

            for (i=0; i<lev.threads.length; i++) {
                if(i == rand){
                    this.lockController.processUnlocking(lev.threads[i]);
                }
            }

            for (i=0; i<lev.threads.length; i++) {
                //note: semaphores work but look funny
                if(i == rand){
                    updateThread(lev.threads[i]);
                }else{
                    lev.threads[i].x = lev.threads[i].nextX;
                    lev.threads[i].y = lev.threads[i].nextY;
                    lev.threads[i].apparentX = lev.threads[i].x;
                    lev.threads[i].apparentY = lev.threads[i].y;
                }
            }
        }
    }

    this.interpolatePositions = function (fraction) {
        var i, t, lev = this.level;
        for (i=0; i<lev.threads.length; i++) {
            t = lev.threads[i];
            t.apparentX = t.x + fraction * (t.nextX-t.x);
            t.apparentY = t.y + fraction * (t.nextY-t.y);
        }
    }

    this.checkGameWin = function () {
        var lev = this.level;
        var gameWin = lev.threads.every(function(elem,i,arry){
            return elem.completedLaps >= lev.neededLaps;
        });
        if(gameWin){
            console.log("you win!");
        }
    }

    //DRAWING
    this.draw = function () {
        var i;

        // Update filmplayers
        for (i=0; i<this.level.threads.length; i++) {
            this.level.threads[i].filmplayer.updateFrame();
        };
        // Draw the background
        context.fillStyle = "#333333"; //#666666
        context.fillRect(0,0,WIDTH,HEIGHT);

        // Draw the grid
        context.strokeStyle = "#444444"; //#949494
        context.lineWidth = 1;
        context.beginPath();
        for(i=0.5;i<HEIGHT;i+=TILE){
            context.moveTo(0,i);
            context.lineTo(GAME_WIDTH,i);
        }
        for(i=0.5;i<GAME_WIDTH;i+=TILE){
            context.moveTo(i,0);
            context.lineTo(i,HEIGHT);
        }
        context.stroke();

        this.level.paths.draw();
        for(i=0;i<this.level.zones.length;i++){
            this.level.zones[i].draw();
        }
        for (i=0; i<this.level.locks.length; i++) {
            this.level.locks[i].draw();
        };
        for (i=0; i<this.level.threads.length; i++) {
            this.level.threads[i].draw();
        };
        for (i=0; i<this.level.gates.length; i++) {
            this.level.paths.drawGate(this.level.gates[i]);
        }

        this.uiController.draw();

    }
}