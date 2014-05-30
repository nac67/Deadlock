var UIController = function (level) {
    this.level = level;

    this.origX = 0;
    this.origY = 0;

    this.lastX = 0;
    this.lastY = 0;
    this.lastClick = false;
    this.dragTarget = null;

    this.processDragging = function (){
        var locks = this.level.locks, lock, mx, my;

        mx = Math.floor(Mouse.x/TILE);
        my = Math.floor(Mouse.y/TILE);


        if(!this.lastClick && Mouse.leftDown){
            //MOUSE DOWN
            //obtain a drag target
            for (var i = 0; i < locks.length; i++) {
                lock = locks[i];
                if(lock.x === mx && lock.y === my){
                    this.dragTarget = lock;
                    lock.dragging = true;
                    this.origX = lock.x;
                    this.origY = lock.y;
                    break;
                }
            };
        }else if(Mouse.leftDown){
            //DRAG
            if(this.dragTarget !== null){
                this.dragTarget.x = mx;
                this.dragTarget.y = my;
            }
        }else if(this.lastClick){
            //MOUSE UP
            if(this.dragTarget !== null){
                var that=this,
                //is the dragged object not on top of any other locks?
                valid = locks.reduce(function(acc,curr,i,arr){
                    if(curr === that.dragTarget) return acc;
                    return acc && !(curr.x == that.dragTarget.x && curr.y == that.dragTarget.y);
                }, true);

                if(!valid) {
                    this.dragTarget.x = this.origX;
                    this.dragTarget.y = this.origY;
                }


                this.dragTarget.dragging = false;
                this.dragTarget = null;
            }
        }
        this.lastClick = Mouse.leftDown;
        this.lastX = Mouse.x/TILE;
        this.lastY = Mouse.y/TILE;
    }
}