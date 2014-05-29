var Utils = (function () {
    //checks if (px,py) lies inside the rectangle. This is inclusive
    //of the boundaries
    var pointInRect = function (px,py,x,y,w,h){
        return px>=x && px<x+w && py>=y && py<y+h;
    }

    return {
        pointInRect: pointInRect
    }
})();