/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/array.js":
/*!**********************!*\
  !*** ./src/array.js ***!
  \**********************/
/*! exports provided: arrayMethods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayMethods\", function() { return arrayMethods; });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\nconst arrayProto = Array.prototype\nconst arrayMethods = Object.create(arrayProto)\n\nconst methodsToPatch = [\n    'push',\n    'pop',\n    'shift',\n    'unshift',\n    'splice',\n    'sort',\n    'reverse'\n]\n\nmethodsToPatch.forEach(function (method) {\n    const original = arrayProto[method]\n    Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"def\"])(arrayMethods, method, function mutator (...args) {\n        const result = original.apply(this, args)\n        const ob = this.__ob__\n        let inserted\n        switch (method) {\n            case 'push':\n            case 'unshift':\n                inserted = args\n                break\n            case 'splice':\n                inserted = args.slice(2)\n                break\n        }\n        if (inserted) ob.observeArray(inserted)\n        ob.dep.notify()\n        return result\n    })\n})\n\n\n//# sourceURL=webpack:///./src/array.js?");

/***/ }),

/***/ "./src/dep.js":
/*!********************!*\
  !*** ./src/dep.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\nclass Dep {\n    constructor() {\n        this.subs = []\n    }\n\n    addSub (sub) {\n        this.subs.push(sub)\n    }\n\n    removeSub (sub) {\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"remove\"])(this.subs, sub)\n    }\n\n    depend () {\n        if (Dep.target) {\n            this.addSub(Dep.target)\n        }\n    }\n\n    notify () {\n        const subs = this.subs.slice()\n        for (let i = 0; i < subs.length; i++) {\n            subs[i].update()\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/dep.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Watcher, Observer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Observer\", function() { return Observer; });\n/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep.js */ \"./src/dep.js\");\n/* harmony import */ var _watcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher.js */ \"./src/watcher.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Watcher\", function() { return _watcher_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ \"./src/array.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\n\n\n\nconst arrayKeys = Object.getOwnPropertyNames(_array_js__WEBPACK_IMPORTED_MODULE_2__[\"arrayMethods\"])\n\nclass Observer {\n    constructor(value) {\n        this.value = value\n        this.dep = new _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"def\"])(value, '__ob__', this)\n\n        if (Array.isArray(value)) {\n            if (_util_js__WEBPACK_IMPORTED_MODULE_3__[\"hasProto\"]) {\n                protoAugment(value, _array_js__WEBPACK_IMPORTED_MODULE_2__[\"arrayMethods\"])\n            } else {\n                copyAugment(value, _array_js__WEBPACK_IMPORTED_MODULE_2__[\"arrayMethods\"], arrayKeys)\n            }\n            this.observeArray(value)\n        } else {\n            this.walk(value)\n        }\n    }\n\n    walk (obj) {\n        const keys = Object.keys(obj)\n        for (let i = 0; i < keys.length; i++) {\n            defineReactive(obj, keys[i], obj[keys[i]])\n        }\n    }\n\n    observeArray (items) {\n        for (let i = 0; i < items.length; i++) {\n            observe(items[i])\n        }\n    }\n}\n\nfunction protoAugment (target, src) {\n    target.__proto__ = src\n}\n\nfunction copyAugment (target, src, keys) {\n    for (let i = 0; i < keys.length; i++) {\n        const key = keys[i]\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"def\"])(target, key, src[key])\n    }\n}\n\nfunction observe (value, asRootData) {\n    if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"isObject\"])(value)) {\n        return\n    }\n\n    let ob\n    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"hasOwn\"])(value, '__ob__') && value.__ob__ instanceof Observer) {\n        ob = value.__ob__\n    } else {\n        ob = new Observer(value)\n    }\n    return ob\n}\n\nfunction defineReactive (data, key, val) {\n    let dep = new _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n    let childOb = observe(val)\n    Object.defineProperty(data, key, {\n        enumerable: true,\n        configurable: true,\n        get: function () {\n            dep.depend()\n            if (childOb) {\n                childOb.dep.depend()\n            }\n            return val\n        },\n        set: function (newVal) {\n            if (val === newVal) {\n                return\n            }\n            val = newVal\n            dep.notify()\n        }\n    })\n}\n\n// Fot test.\nwindow.Watcher = _watcher_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\nwindow.Observer = Observer\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: hasProto, remove, def, isObject, hasOwn, parsePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasProto\", function() { return hasProto; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"def\", function() { return def; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasOwn\", function() { return hasOwn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parsePath\", function() { return parsePath; });\nconst hasProto = '__proto__' in {}\n\nfunction remove (arr, item) {\n    if (arr.length) {\n        const index = arr.indexOf(item)\n        if (index > -1) {\n            return arr.splice(index, 1)\n        }\n    }\n}\n\nfunction def (obj, key, val, enumerable) {\n    Object.defineProperty(obj, key, {\n        value: val,\n        enumerable: !!enumerable,\n        writable: true,\n        configurable: true\n    })\n}\n\nfunction isObject (obj) {\n    return obj !== null && typeof obj === 'object'\n}\n\nfunction hasOwn (obj, key) {\n    return Object.prototype.hasOwnProperty.call(obj, key)\n}\n\n\nconst bailRE = /[^\\w.$]/\nfunction parsePath (path) {\n    if (bailRE.test(path)) {\n        return\n    }\n\n    const segments = path.split('.')\n    return function (obj) {\n        for (let i = 0; i < segments.length; i++) {\n            if (!obj) return\n            obj = obj[segments[i]]\n        }\n        return obj\n    }\n}\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep.js */ \"./src/dep.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\n\nclass Watcher {\n    constructor(vm, expOrFn, cb) {\n        this.vm = vm\n        this.getter = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"parsePath\"])(expOrFn)\n        this.cb = cb\n        this.value = this.get()\n    }\n\n    get () {\n        _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = this\n        let value = this.getter.call(this.vm, this.vm)\n        _dep_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = undefined\n        return value\n    }\n\n    update () {\n        const oldValue = this.value\n        this.value = this.get()\n        this.cb.call(this.vm, this.value, oldValue)\n    }\n}\n\n\n//# sourceURL=webpack:///./src/watcher.js?");

/***/ })

/******/ });