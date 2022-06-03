import { test } from 'tapzero'
import { DataDesk } from './tree.js'


test('datadesk', t=>{
    let tree = new DataDesk()
    let val = tree.view('').get('key0A')
    t.equal(val, '')
    tree.edit("", "tock1", db => {
        db.set('key0A', 'val0A')
        db.set('key1A', 'val1A')
    })
    val = tree.view('tock1').get('key0A')
    t.equal(val, 'val0A')
    tree.edit('tock1', 'tock2', db => {
        db.set('key0A', 'val0B')
    })

    t.equal(tree.view('tock1').get('key0A'), 'val0A')
    t.equal(tree.view('tock2').get('key0A'), 'val0B')

    t.equal(tree.view('tock1').get('key1A'), 'val1A')
    t.equal(tree.view('tock2').get('key1A'), 'val1A')

    t.equal(tree.view('').get('key0A'), '')
})
