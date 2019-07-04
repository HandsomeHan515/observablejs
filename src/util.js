export const hasProto = '__proto__' in {}

export function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

export function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        vlaue: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

export function hasOwn (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}


const bailRE = /[^\w.$]/
export function parsePath (path) {
    if (bailRE.test(path)) {
        return
    }

    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}