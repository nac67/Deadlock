var LockController = function (level) {
    this.level = level;

    this.mutexKeys = [1,1,1];
    this.semaphoreKeys = [2,0,0];
    this.neededAtBarrier = [3,3,3];
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
            if(currentLock instanceof Semaphore){
                if(currentLock.type === SemaphoreType.V){
                    this.semaphoreKeys[currentLock.color] ++;
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
            if(currentLock instanceof Semaphore){
                if(currentLock.type === SemaphoreType.P){
                    if(this.semaphoreKeys[currentLock.color] > 0){
                        this.semaphoreKeys[currentLock.color] --;
                        thread.blocked = false;
                    }else{
                        thread.blocked = true;
                    }
                }
            }
            if(currentLock instanceof Barrier){
                if(this.atBarrier[currentLock.color] >= this.neededAtBarrier[currentLock.color]){
                    thread.blocked = false;
                }else{
                    thread.blocked = true;
                }
            }
        }
    }

    this.countThoseAtBarrier = function (state) {
        var lock, thread, currentLock;

        this.atBarrier = [0,0,0];
        
        for (var i = 0; i < this.level.threads.length; i++) {
            thread = this.level.threads[i];
            currentLock = this.level.getLockAt(thread.nextX,thread.nextY);
            if(currentLock !== null){
                if(currentLock instanceof Barrier){
                    this.atBarrier[currentLock.color]++;
                }
            }
        }
    }

    this.setLockGraphics = function (state) {
        var lock;
        for (var i = 0; i < this.level.locks.length; i++) {
            lock = this.level.locks[i];
            if(lock instanceof Semaphore){
                lock.displayNumber = state === GameState.SIMULATION ? this.semaphoreKeys[lock.color] : -1;
            }
            if(lock instanceof Barrier){
                lock.displayNumber = this.neededAtBarrier[lock.color];
            }
        };
    }
}