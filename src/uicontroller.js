var UIController = function (level) {
    this.level = level;

    this.lastX = 0;
    this.lastY = 0;
    this.lastClick = false;
    this.dragTarget = null;

    this.processDragging = function (){
        var locks = this.level.locks, lock, mx, my, _mx, _my, dx,dy;

        mx = Mouse.x/TILE;
        my = Mouse.y/TILE;
        _mx = Math.floor(mx);
        _my = Math.floor(my);

        if(!this.lastClick && Mouse.leftDown){
            //MOUSE DOWN
            //obtain a drag target
            for (var i = 0; i < locks.length; i++) {
                lock = locks[i];
                if(lock.x === _mx && lock.y === _my){
                    this.dragTarget = lock;
                    break;
                }
            };
        }else if(Mouse.leftDown){
            //DRAG
            if(this.dragTarget !== null){
                dx = mx - this.lastX;
                dy = my - this.lastY;
                this.dragTarget.dragX += dx;
                this.dragTarget.dragY += dy;
                this.dragTarget.setXYToDrag();
            }
        }else if(this.lastClick){
            //MOUSE UP
            this.dragTarget = null;
        }
        this.lastClick = Mouse.leftDown;
        this.lastX = Mouse.x/TILE;
        this.lastY = Mouse.y/TILE;
    }
}