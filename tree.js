import { Map } from 'immutable'
export { DataDesk }

// thin wrapper around mutable handle with emptyblob-initialize
class Desk {
    constructor(map) {
        this.map = map
        this.done = false
    }
    get(k) {
        if (this.map.has(k)) {
            let val = this.map.get(k)
            if (!val) {
                return ""
            } else {
                return this.map.get(k)
            }
        } else {
            return ""
        }
    }
    set(k, v) {
        if (this.done) { throw new Error(`panic: set on sealed desk`) }
        if (v == '') {
            this.map.delete(k)
        } else {
            this.map.set(k, v)
        }
    }
    _seal() {
        this.done = true;
        this.map = this.map.asImmutable()
        return this.map
    }
}

class DataDesk {
    constructor() {
        this.snaps = {
            "": new Map()
        }
    }

    edit(load, save, func) {
        if (!this.snaps[load]) {
            throw new Error(`no such snap: ${load}`)
        }
        if (this.snaps[save]) {
            throw new Error(`snap already exists: ${save}`)
        }
        let prev = this.snaps[load]
        let desk = new Desk(prev.asMutable())
        func(desk)
        let next = desk._seal()
        this.snaps[save] = next
        return desk
    }

    view(snap) {
        if (!this.snaps[snap]) {
            throw new Error(`no such snap: ${snap}`)
        }
        let desk = new Desk(this.snaps[snap])
        desk._seal()
        return desk
    }

    snip(snap) {
        throw new Error(`unimplemented`)
        // best we can do with immutable.js is to just replay
        // everything onto prior set, not worth doing for reference thing
    }
}
