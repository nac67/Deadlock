var GameplayController = function () {
    this.level = new Level();
    this.level.loadLevel("put a path here");


    var timer = 0;
    this.update = function () {
        var lev = this.level, fraction;

        if(timer == 0){
            timer = DELTA;
            this.validatePositions();
            this.calculateNextPositions();
        }else{
            timer --;
            fraction = 1-timer/DELTA;
            this.interpolatePositions(fraction);
        }
    }

    // UPDATE helpers
    this.validatePositions = function () {
        
    }

    this.calculateNextPositions = function () {
        var i, t, turn, lev = this.level;
        for (i=0; i<lev.threads.length; i++) {
            t = lev.threads[i];
            t.x = t.nextX;
            t.y = t.nextY;
            t.apparantX = t.x;
            t.apparantY = t.y;

            turn = lev.paths.getDirection(t.x,t.y);
            if(turn != null){
                t.dir = turn;
            }

            if(t.dir == DirEnum.UP) t.nextY --;
            if(t.dir == DirEnum.DOWN) t.nextY ++;
            if(t.dir == DirEnum.LEFT) t.nextX --;
            if(t.dir == DirEnum.RIGHT) t.nextX ++;
        }
    }

    this.interpolatePositions = function (fraction) {
        var i, t, lev = this.level;
        for (i=0; i<lev.threads.length; i++) {
            t = lev.threads[i];
            t.apparantX = t.x + fraction * (t.nextX-t.x);
            t.apparantY = t.y + fraction * (t.nextY-t.y);
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
        for (i=0; i<this.level.threads.length; i++) {
            this.level.threads[i].draw();
        };

    }
}