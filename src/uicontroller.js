var UIController = function (level) {
    this.level = level;

    this.origX = 0;
    this.origY = 0;

    this.lastClick = false;
    this.dragTarget = null;

    this.selectedObject = null;

    this.mx = 0;
    this.my = 0;

    this.processDragging = function (){
        this.mx = Math.floor(Mouse.x/TILE);
        this.my = Math.floor(Mouse.y/TILE);


        if(!this.lastClick && Mouse.leftDown){
            //MOUSE DOWN
            this.obtainDragTarget();
        }else if(Mouse.leftDown){
            //DRAG
            this.dragCurrentObject();
        }else if(this.lastClick){
            //MOUSE UP
            this.releaseDragTarget();
        }
        this.lastClick = Mouse.leftDown;
    }

    this.obtainDragTarget = function () {
        var locks = this.level.locks, lock;
        for (var i = 0; i < locks.length; i++) {
            lock = locks[i];
            if(lock.x === this.mx && lock.y === this.my){
                this.dragTarget = lock;
                lock.dragging = true;
                this.origX = lock.x;
                this.origY = lock.y;
                break;
            }
        };
        if(this.dragTarget !== null){
            this.selectedObject = this.dragTarget;
        }else{
            if(Mouse.x < GAME_WIDTH){
                this.selectedObject = null;
            }
        }
    }

    this.dragCurrentObject = function () {
        if(this.dragTarget !== null){
            this.dragTarget.x = this.mx;
            this.dragTarget.y = this.my;
        }
    }

    this.releaseDragTarget = function () {
        if(this.dragTarget !== null){
            var that=this,
            //is the dragged object not on top of any other locks?
            valid = this.level.locks.reduce(function(acc,curr,i,arr){
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

    this.draw = function () {
        if(this.selectedObject !== null && this.dragTarget === null){
            context.drawImage(
                Content.getImage('images/selected.png'),
                this.selectedObject.x*TILE,
                this.selectedObject.y*TILE);
        }
    }
}