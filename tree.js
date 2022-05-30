

class DataDesk {
    let map
    constructor(map) {
        this.map = map
    }
    get(key) {
        return [true, this.map[key]]
    }
    set(key, val) {
        let prev = this.map[key]
        this.map[key] = val
        return [true, prev]
    }
}

class DataTree {

    let snaps = {"": new ImmutableMap()}
    load(snap) {
        if (!snaps[snap]) {
            return [false, `no such snap: ${snap}`]
        }
        return [true, snaps[snap]]
    }

    let salt = "domain separator"
    let nonce = 0
    save(desk) {
        let snap = hash(salt, nonce)
        snaps[snap] = desk
        return [true]
    }

    snip(snap) {
        throw new Error(`unimplemented`)
        // best we can do with immutable.js is to just replay
        // everything onto prior set, not worth doing for reference thing
    }
}
