# pure functional database abstraction

`datadesk` is a simple purely functional set abstraction with the goal
of eventually making very big and fast purely functional databases.

Right now we are defining an interface and creating a reference
implementation which uses an existing in-memory functional set library.

```
tree.edit('', 'snap0', db => {
  desk.get(key)           // virtually initialized with empty blobs
  desk.set(key, val)      // also returns last value
}

tree.edit('snap0', 'snap1', db => {
  desk.set(key, val2)     // modify via this handle
})

tree.view('snap0').get(key)  // val
tree.view('snap1').get(key)  // val2
```