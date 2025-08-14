export type CacheEntry <T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    #cache = new Map<string,CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    };

    add<T>(key:string,val:T): void {
        const obj: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key,obj);
    };

    get<T>(key:string):T | undefined {
        if (this.#cache.has(key)) { 
            const entry = this.#cache.get(key);
            if (entry) {
                return entry.val;
                }
            }
        return undefined;
    }

    #reap = (): void => {
        for (let [key, value] of this.#cache) {
            const mapInterval = value.createdAt;
            if (mapInterval < (Date.now() - this.#interval)){
                this.#cache.delete(key);
            }
        }

    }

    #startReapLoop():void {
        this.#reapIntervalId = setInterval(this.#reap,this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }


}