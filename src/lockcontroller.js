var LockController = function (level) {
    this.level = level;

    //at this point in time thread.x,y is its previous position, and
    //thread.nextX,nextY is where it is currently arriving
    this.processUnlocking = function (thread) {
        var currentLock = this.level.getLockAt(thread.nextX,thread.nextY),
        mutexKeys = this.level.mutexKeys,
        semaphoreKeys = this.level.semaphoreKeys,
        neededAtBarrier = this.level.neededAtBarrier,
        atBarrier = this.level.atBarrier;

        if(currentLock !== null){
            if(currentLock instanceof Mutex){
                if(currentLock.type === MutexType.UNLOCK){
                    mutexKeys[currentLock.color] ++;
                    if(mutexKeys[currentLock.color] !== 1){
                        alert("cannot free already freed lock!");
                    }
                }
            }
            if(currentLock instanceof Semaphore){
                if(currentLock.type === SemaphoreType.V){
                    semaphoreKeys[currentLock.color] ++;
                }
            }
        }
    }

    //at this point in time thread.x,y is its previous position, and
    //thread.nextX,nextY is where it is currently arriving
    this.processLocking = function (thread) {
        var currentLock = this.level.getLockAt(thread.nextX,thread.nextY),
        mutexKeys = this.level.mutexKeys,
        semaphoreKeys = this.level.semaphoreKeys,
        neededAtBarrier = this.level.neededAtBarrier,
        atBarrier = this.level.atBarrier;

        if(currentLock !== null){
            if(currentLock instanceof Mutex){
                if(currentLock.type === MutexType.LOCK){
                    if(mutexKeys[currentLock.color] === 1){
                        mutexKeys[currentLock.color] --;
                        thread.blocked = false;
                    }else{
                        thread.blocked = true;
                    }
                }
            }
            if(currentLock instanceof Semaphore){
                if(currentLock.type === SemaphoreType.P){
                    if(semaphoreKeys[currentLock.color] > 0){
                        semaphoreKeys[currentLock.color] --;
                        thread.blocked = false;
                    }else{
                        thread.blocked = true;
                    }
                }
            }
            if(currentLock instanceof Barrier){
                if(atBarrier[currentLock.color] >= neededAtBarrier[currentLock.color]){
                    thread.blocked = false;
                }else{
                    thread.blocked = true;
                }
            }
        }
    }

    this.countThoseAtBarrier = function (state) {
        var lock, thread, currentLock;

        this.level.atBarrier = [0,0,0];
        
        for (var i = 0; i < this.level.threads.length; i++) {
            thread = this.level.threads[i];
            currentLock = this.level.getLockAt(thread.nextX,thread.nextY);
            if(currentLock !== null){
                if(currentLock instanceof Barrier){
                    this.level.atBarrier[currentLock.color]++;
                }
            }
        }
    }

    this.setLockGraphics = function (state) {
        var lock;
        for (var i = 0; i < this.level.locks.length; i++) {
            lock = this.level.locks[i];
            if(lock instanceof Semaphore){
                lock.displayNumber = state === GameState.SIMULATION ? this.level.semaphoreKeys[lock.color] : -1;
            }
            if(lock instanceof Barrier){
                lock.displayNumber = this.level.neededAtBarrier[lock.color];
            }
        };
    }
}