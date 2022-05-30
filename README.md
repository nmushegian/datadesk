# pure functional database abstraction

`datatree` is a simple purely functional set abstraction with the goal
of eventually making very big and fast purely functional databases.

Right now we are defining an interface and creating a reference
implementation which uses an existing in-memory functional set library.

```
desk = tree.load(snap)    // get a desk from a snap ("" is init desk)
snap = tree.save(desk)    // save a desk to get a snap
desk.get(key)             // virtually emptyblob-initialized
desk.set(key,val)         // set, also return the last value
```

Two important properties we must have:
- `save` returns identifiers that are also valid keys/values
- `save` returns identifiers that have negligible chance of collision
  with values, ie, they are hashes, but also,
- `save` does *not* need to be stable (provide same snap hash values)
  across implementations or even the same sequence of operations.
  It does *not* need to be a merkle root, it is entirely local. Use
  it to build things with merkle roots.


```
desk = tree.load("")    // load from opaque `snap`; "" is init desk

desk.get(key)           // virtually initialized with empty blobs
desk.set(key, val)      // also returns last value

snap0 = tree.save(dd)   // save this state for later
desk.set(key, val2)     // modify via this handle
snap1 = tree.save(dd)   // save it also

desk = tree.load(snap0) // now restore snap0
desk.get(key)           // val

desk = tree.load(snap1) // back to snap1
desk.get(key)           // val2
```