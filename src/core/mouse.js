var Mouse = function () {

    window.document.addEventListener("mousedown",mouseDown);
    window.document.addEventListener("mouseup",mouseUp);
    window.document.addEventListener("mousemove",mouseMove);

    var leftDown = false;
    var x = 0;
    var y = 0;

    function mouseDown (event){
        Mouse.leftDown = true;

        if (event.x != undefined && event.y != undefined) {
            Mouse.x = event.x;
            Mouse.y = event.y;
        } else { // Firefox method to get the position
            Mouse.x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            Mouse.y = event.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        Mouse.x -= canvas.offsetLeft;
        Mouse.y -= canvas.offsetTop;
    }

    //TODO cache offset
    function mouseMove (event){
        if (event.x != undefined && event.y != undefined) {
            Mouse.x = event.x;
            Mouse.y = event.y;
        } else { // Firefox method to get the position
            Mouse.x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            Mouse.y = event.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        Mouse.x -= canvas.offsetLeft;
        Mouse.y -= canvas.offsetTop;
    }

    function mouseUp (event){
        Mouse.leftDown = false;
    }

    return {
        x: x,
        y: y,
        leftDown: leftDown
    }

} ();