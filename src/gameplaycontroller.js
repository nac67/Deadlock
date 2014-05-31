var GameplayController = function () {
    this.level = new Level();
    this.lockController = new LockController(this.level);
    this.uiController = new UIController(this.level);
    this.level.loadLevel("put a path here");


    var timer = 0;
    this.update = function () {
        var lev = this.level, fraction;

        this.uiController.processDragging();

        if(timer == 0){
            timer = DELTA;
            
            this.calculateNextPositions();
            this.validatePositions();
        }else{
            timer --;
            fraction = 1-timer/DELTA;
            this.interpolatePositions(fraction);
        }
    }

    // UPDATE helpers
    this.validatePositions = function () {
        var that = this;
        var valid = this.level.zones.reduce(
            function (acc, curr, i, arr) {
                return acc && curr.isValid(that.level.threads);
            }, true);

        if(!valid) {
            console.log("you lose the game!!!!");
        }
    }

    this.calculateNextPositions = function () {
        function updateThread (thread) {
            thread.x = thread.nextX;
            thread.y = thread.nextY;
            thread.apparentX = thread.x;
            thread.apparentY = thread.y;

            turn = lev.paths.getDirection(thread.x,thread.y);
            if(turn != null){
                thread.dir = turn;
            }

            if(thread.dir == DirEnum.UP) thread.nextY --;
            if(thread.dir == DirEnum.DOWN) thread.nextY ++;
            if(thread.dir == DirEnum.LEFT) thread.nextX --;
            if(thread.dir == DirEnum.RIGHT) thread.nextX ++;
        }

        var i, t, turn, lev = this.level;

        if(MOVE_SAME_TIME){
            for (i=0; i<lev.threads.length; i++) {
                updateThread(lev.threads[i]);
            }
        }else{
            var rand = Math.floor(Math.random()*lev.threads.length);
            for (i=0; i<lev.threads.length; i++) {
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

        this.uiController.draw();

    }
}