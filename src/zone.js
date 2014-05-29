var ZoneStateEnum = {OUTSIDE: 0, EDGE: 1, INSIDE: 2};

var Zone = function (x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;


    this.numberInside = function(threads){
        //TODO
    }
    this.isValid = function(threads){
        //TODO
    }

    this.checkBoundary = function (x,y) {
        if(Utils.pointInRect(x,y,this.x+1,this.y+1,this.w-2,this.h-2)){
            return ZoneStateEnum.INSIDE;
        }else if(Utils.pointInRect(x,y,this.x,this.y,this.w,this.h)){
            return ZoneStateEnum.EDGE;
        }else{
            return ZoneStateEnum.OUTSIDE;
        }
    }

    this.draw = function () {
        var x = this.x*TILE + TILE/2 + 0.5;
        var y = this.y*TILE + TILE/2 + 0.5;
        var w = (this.w-1)*TILE;
        var h = (this.h-1)*TILE;
        context.fillStyle = "#000000";
        context.fillRect(x,y,w,h);
        context.strokeStyle = "#00FF00";
        context.strokeRect(x,y,w,h);
    }

}