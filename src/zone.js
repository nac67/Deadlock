var ZoneStateEnum = {OUTSIDE: 0, EDGE: 1, INSIDE: 2};

var Zone = function (x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    /* This will return the bracket used by isValid */
    this.numberInside = function(threads){
        //TODO
    }

    /* There will be a certain number of threads inside the zone. 
       This number is actually a bracket because if a thread in on the 
       edge, it can count or not be counted as the number of threads 
       inside the zone. A zone will always be valid if 0 is inside 
       the bracket. For example, if this is an EXACTLY 2 zone, then 
       it should be valid if 0 is inside the interval or 2 is inside 
       the interval.
    */
    this.isValid = function(threads){
        var bracket, lower, upper;
        bracket = this.numberInside(threads);
        lower = bracket[0];
        upper = bracket[1];
        //TODO
    }

    /* This checks if a cell is inside the zone or on the edge of it.
       This will be used when counting how many threads are in an
       area. Inside means definitely count it. On the edge means you 
       can count it or not count it, i.e. the count should be lenient
       and not halt the "program" because it should still be valid
    */
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