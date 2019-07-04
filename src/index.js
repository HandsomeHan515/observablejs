import Dep from './dep'
import Watcher from './watcher'
import { arrayMethods } from './array'
import { def, hasOwn, isObject, hasProto } from './util'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            if (hasProto) {
                protoAugment(value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk (obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }

    observeArray (items) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
}

function protoAugment (target, src) {
    target.__proto__ = src
}

function copyAugment (target, src, keys) {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

export function observe (value, asRootData) {
    if (!isObject(value)) {
        return
    }

    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

export function defineReactive (data, key, val) {
    let dep = new Dep()
    let childOb = observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend()
            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}

// test 
window.Observer = Observer
window.Watcher = Watcher

export { Watcher }
