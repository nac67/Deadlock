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

    this.drawGate = (function(){

        var cache = {};

        return function (gate) {
            var _x,_y;

            var x = gate[0];
            var y = gate[1];
            var dir = gate[2];

            //the key for the cache table
            var s = x+","+y+","+dir+","+TILE;

            if(!cache[s]){
                var transform = function(i,dir){
                    _x[i] -= .5;
                    _y[i] -= .5;
                    if(dir === DirEnum.LEFT){
                        var t = _x[i];
                        _x[i] = _y[i];
                        _y[i] = -t;
                    }
                    if(dir === DirEnum.RIGHT){
                        var t = _x[i];
                        _x[i] = -_y[i];
                        _y[i] = t;

                    }
                    if(dir === DirEnum.DOWN){
                        _x[i] = -_x[i];
                        _y[i] = -_y[i];
                    }
                    _x[i] += .5;
                    _y[i] += .5;

                    _x[i] = (_x[i]+x)*TILE;
                    _y[i] = (_y[i]+y)*TILE;

                    if(dir == DirEnum.UP || dir == DirEnum.DOWN){
                        _x[i]+=.5;
                    }
                    if(dir == DirEnum.LEFT || dir == DirEnum.RIGHT){
                        _y[i]+=.5;
                    }
                }

                _x = [.2,.5,.8];
                _y = [.6,.3,.6];

                for(var i=0;i<_x.length;i++){
                    transform(i, dir);
                }

                cache[s] = [_x,_y];
            }

            _x = cache[s][0];
            _y = cache[s][1];
            
            context.beginPath();
            for(var i=0;i<_x.length;i++){
                if(i===0){
                    context.moveTo(_x[i],_y[i]);
                }else if(i<_x.length-1){
                    context.lineTo(_x[i],_y[i]);
                }else{
                    context.lineTo(_x[i],_y[i]);
                    context.lineTo(_x[0],_y[0]);
                }
            }
            context.closePath();
            context.fillStyle = '#FFFFFF';
            context.fill();
        }
    })();
}