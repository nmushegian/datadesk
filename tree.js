

class DataDesk {
    let map
    constructor(map) {
        this.map = map
    }
    get(key) {
        return [true, this.map.get(key)]
    }
    set(key, val) {
        let prev = this.map.get(key)
        this.map = this.map.set(key, val)
        return [true, prev]
    }
}

class DataTree {

    let snaps = {"": new ImmutableMap()}
    load(snap) {
        if (!snaps[snap]) {
            return [false, `no such snap: ${snap}`]
        }
        return [true, new DataDesk(snaps[snap])]
    }

    let salt = "domain separator"
    let nonce = 0
    save(desk) {
        let snap = hash(salt, nonce)
        snaps[snap] = desk.map
        nonce++
        return [true, snap]
    }

    snip(snap) {
        throw new Error(`unimplemented`)
        // best we can do with immutable.js is to just replay
        // everything onto prior set, not worth doing for reference thing
    }
}
