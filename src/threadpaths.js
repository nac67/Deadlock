var DirEnum = {LEFT: 0, RIGHT:1, UP:2, DOWN:3};

var ThreadPaths = function () {
   
    //TODO optimize this if necessary
    //http://www.timdown.co.uk/jshashtable/
    //halfway down on that webpage, use hashtable

    //each thread path is of the form 
    //  [   [x,y,direction] ... ]
    //
    //allPathTurns is an array of thread paths
    var allPathTurns = [];

    this.addTurn = function (x,y,dir,turnNumber){
        if(!this.hasPathNumber(turnNumber)){
            allPathTurns[turnNumber] = [];
        }
        allPathTurns[turnNumber].push([x,y,dir]);
    }

    this.getDirection = function (x,y) {
        var turn;
        for(var j=0;j<allPathTurns.length;j++){
            if(this.hasPathNumber(j)){
                turn = allPathTurns[j];
                for(var i=0;i<turn.length;i++){
                    if(turn[i][0] == x && turn[i][1] == y){
                        return turn[i][2];
                    }
                }
            }
        }
        return null;
    }

    this.drawTurnPaths = function (turn) {
        var x,y;

        context.strokeStyle="#FFFFFF";
        context.lineWidth=3;
        context.beginPath();

        for (var i = 0; i < turn.length; i++) {

            x = turn[i][0]*TILE+TILE/2+.5;
            y = turn[i][1]*TILE+TILE/2+.5;

            if(i==0){
                context.moveTo(x,y);
            }else if(i<turn.length-1){
                context.lineTo(x,y);
            }else{
                context.lineTo(x,y);
                x = turn[0][0]*TILE+TILE/2+.5;
                y = turn[0][1]*TILE+TILE/2+.5;
                context.lineTo(x,y);
            }
        };
        context.stroke();

        //TODO draw start gates

    }

    this.hasPathNumber = function (n){
        return !(typeof allPathTurns[n] === "undefined");
    }

    this.draw = function () {
        for(var j=0;j<allPathTurns.length;j++){
            if(this.hasPathNumber(j)){
                this.drawTurnPaths(allPathTurns[j]);
            }
        }
    }
}