var GameplayController = function () {
    this.level = new Level();
    this.level.loadLevel("put a path here");



    this.update = function () {

    }

    this.draw = function () {
        var i;

        // Update filmplayers
        for (i=0; i<this.level.threads.length; i++) {
            this.level.threads[i].filmplayer.updateFrame();
        };
        // Draw the background
        context.fillStyle = "#666666";
        context.fillRect(0,0,WIDTH,HEIGHT);

        // Draw the grid
        context.strokeStyle = "#777777"; //#949494
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