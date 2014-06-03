var LockController = function (level) {
    this.level = level;

    this.mutexKeys = [1,1,1];
    this.semaphoreKeys = [0,0,0];
    this.atBarrier = [0,0,0];

    //at this point in time thread.x,y is its previous position, and
    //thread.nextX,nextY is where it is currently arriving
    this.processUnlocking = function (thread) {
        var currentLock = this.level.getLockAt(thread.nextX,thread.nextY);

        if(currentLock !== null){
            if(currentLock instanceof Mutex){
                if(currentLock.type === MutexType.UNLOCK){
                    this.mutexKeys[currentLock.color] ++;
                    if(this.mutexKeys[currentLock.color] !== 1){
                        alert("cannot free already freed lock!");
                    }
                }
            }
        }
    }

    //at this point in time thread.x,y is its previous position, and
    //thread.nextX,nextY is where it is currently arriving
    this.processLocking = function (thread) {
        var currentLock = this.level.getLockAt(thread.nextX,thread.nextY);

        if(currentLock !== null){
            if(currentLock instanceof Mutex){
                if(currentLock.type === MutexType.LOCK){
                    if(this.mutexKeys[currentLock.color] === 1){
                        this.mutexKeys[currentLock.color] --;
                        thread.blocked = false;
                    }else{
                        thread.blocked = true;
                    }
                }
            }
        }
    }
}