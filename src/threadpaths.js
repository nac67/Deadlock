var DirEnum = {LEFT: 0, RIGHT:1, UP:2, DOWN:3};

var ThreadPaths = function () {
   
    //TODO optimize this if necessary
    //http://www.timdown.co.uk/jshashtable/
    //halfway down, use hashtable
    var turn0 = []; //[   [x,y,direction] ... ]
    var turn1 = [];
    var turn2 = [];

    this.addTurn = function (x,y,dir,turnNumber){
        if(turnNumber == 0)
            turn0.push([x,y,dir]);
        if(turnNumber == 1)
            turn1.push([x,y,dir]);
        if(turnNumber == 2)
            turn2.push([x,y,dir]);
    }

    this.getDirection = function (x,y) {
        for(var i=0;i<turn0.length;i++){
            if(turn0[i][0] == x && turn0[i][1] == y){
                return turn0[i][2];
            }
        }
        for(var i=0;i<turn1.length;i++){
            if(turn1[i][0] == x && turn1[i][1] == y){
                return turn1[i][2];
            }
        }
        for(var i=0;i<turn2.length;i++){
            if(turn2[i][0] == x && turn2[i][1] == y){
                return turn2[i][2];
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

    this.draw = function () {
        if(turn0.length > 2){
            this.drawTurnPaths(turn0);
        }
        if(turn1.length > 2){
            this.drawTurnPaths(turn1);
        }
        if(turn2.length > 2){
            this.drawTurnPaths(turn2);
        }
    }
}