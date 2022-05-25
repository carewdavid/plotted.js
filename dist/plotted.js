/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Plotted", [], factory);
	else if(typeof exports === 'object')
		exports["Plotted"] = factory();
	else
		root["Plotted"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/line.ts":
/*!*********************!*\
  !*** ./src/line.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Line\": () => (/* binding */ Line)\n/* harmony export */ });\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties */ \"./src/properties.ts\");\n\nclass Line extends _properties__WEBPACK_IMPORTED_MODULE_0__.Properties {\n    constructor(start, end) {\n        super();\n        this.start = start;\n        this.end = end;\n    }\n    exportSVG() {\n        return `<line x1=\"${this.start.x}\" y1=\"${this.start.y}\" x2=\"${this.end.x}\" y2=\"${this.end.y}\" ${this.properties()}/>`;\n    }\n    draw(canvas) {\n        canvas.strokeStyle = this.attributes.get('stroke');\n        canvas.beginPath();\n        canvas.moveTo(this.start.x, this.start.y);\n        canvas.lineTo(this.end.x, this.end.y);\n        canvas.stroke();\n    }\n}\n\n\n//# sourceURL=webpack://Plotted/./src/line.ts?");

/***/ }),

/***/ "./src/path.ts":
/*!*********************!*\
  !*** ./src/path.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Path\": () => (/* binding */ Path)\n/* harmony export */ });\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties */ \"./src/properties.ts\");\n\nclass Path extends _properties__WEBPACK_IMPORTED_MODULE_0__.Properties {\n    constructor(start) {\n        super();\n        this.commands = [];\n        this.vertices = [];\n        if (start !== undefined) {\n            this.moveTo(start);\n        }\n    }\n    _renderCommands() {\n        let result = \"\";\n        for (let cmd of this.commands) {\n            switch (cmd.kind) {\n                case \"move\":\n                    result += `M ${cmd.target.x} ${cmd.target.y}`;\n                    break;\n                case \"line\":\n                    result += `L ${cmd.target.x} ${cmd.target.y}`;\n                    break;\n                case \"curve\":\n                    result += `Q ${cmd.control.x} ${cmd.control.y} ${cmd.target.x} ${cmd.target.y}`;\n                    break;\n                case \"bezier\":\n                    result += `C ${cmd.control1.x} ${cmd.control1.y} ${cmd.control2.x} ${cmd.control2.y} ${cmd.target.x} ${cmd.target.y}`;\n                    break;\n                case \"close\": result += 'Z';\n            }\n        }\n        return result;\n    }\n    exportSVG() {\n        return `<path ${this.properties()} d=\"${this._renderCommands()}\"`;\n    }\n    draw(canvas) {\n        canvas.fillStyle = this.attributes.get(\"fill\");\n        canvas.strokeStyle = this.attributes.get(\"stroke\");\n        canvas.beginPath();\n        for (let cmd of this.commands) {\n            switch (cmd.kind) {\n                case \"move\":\n                    canvas.moveTo(cmd.target.x, cmd.target.y);\n                    break;\n                case \"line\":\n                    canvas.lineTo(cmd.target.x, cmd.target.y);\n                    break;\n                case \"curve\":\n                    canvas.quadraticCurveTo(cmd.control.x, cmd.control.y, cmd.target.x, cmd.target.y);\n                    break;\n                case \"bezier\":\n                    canvas.bezierCurveTo(cmd.control1.x, cmd.control1.y, cmd.control2.x, cmd.control2.y, cmd.target.x, cmd.target.y);\n                    break;\n                case \"close\":\n                    canvas.closePath();\n                    break;\n            }\n        }\n        canvas.stroke();\n    }\n    //Absolute movement commands\n    /**Move to position */\n    moveTo(target) {\n        this.vertices.push(target);\n        this.commands.push({ kind: \"move\", target: target });\n        return this;\n    }\n    /**Draw a line to position */\n    lineTo(target) {\n        this.vertices.push(target);\n        this.commands.push({ kind: \"line\", target: target });\n        return this;\n    }\n    /**Draw a quadratic bezier curve to target with control point control */\n    curveTo(control, target) {\n        this.vertices.push(target); //Only the target point is a vertex in the path\n        this.commands.push({ kind: \"curve\", target: target, control: control });\n        return this;\n    }\n    /**Draw a cubic bezier curve to target with control points control1 and control2 */\n    bezierTo(control1, control2, target) {\n        this.vertices.push(target);\n        this.commands.push({ kind: \"bezier\", target: target, control1: control1, control2: control2 });\n        return this;\n    }\n    close() {\n        this.commands.push({ kind: \"close\" });\n        return this;\n    }\n}\n\n\n//# sourceURL=webpack://Plotted/./src/path.ts?");

/***/ }),

/***/ "./src/point.ts":
/*!**********************!*\
  !*** ./src/point.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Point\": () => (/* binding */ Point)\n/* harmony export */ });\n/**\n * @classdesc A 2d point\n */\nclass Point {\n    /** @constructor */\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    /** Add to a point\n     * @param {(number|Point)} The quantity to add\n     * @returns {Point} The resulting Point\n    */\n    add(delta) {\n        if (typeof delta === \"number\") {\n            return new Point(this.x + delta, this.y + delta);\n        }\n        else {\n            return new Point(this.x + delta.x, this.y + delta.y);\n        }\n    }\n    /** Subract from a point\n * @param {(number|Point)} The quantity to subtract\n * @returns {Point} The resulting Point\n*/\n    subtract(delta) {\n        if (typeof delta === \"number\") {\n            return new Point(this.x - delta, this.y - delta);\n        }\n        else {\n            return new Point(this.x - delta.x, this.y - delta.y);\n        }\n    }\n    /** Multiply a point by a scalar\n     * @returns The resulting point\n    */\n    mult(delta) {\n        return new Point(this.x * delta, this.y * delta);\n    }\n    /** Divide a point by a scalar\n     * @returns The resulting point\n    */\n    div(delta) {\n        return new Point(this.x / delta, this.y / delta);\n    }\n    /**Return the length of the point */\n    length() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n    /** Calculate the Euclidean distance to other */\n    dist(other) {\n        const dx = this.x - other.x;\n        const dy = this.y - other.y;\n        return Math.sqrt(dx * dx + dy * dy);\n    }\n    /**  */\n    normalize() {\n        const len = this.length();\n        return new Point(this.x / len, this.y / len);\n    }\n    /**Rotate a point\n     * @param {number} angle The amount to rotate in radians\n     * @param {Point} [center] The point to rotate around. Defaults to (0, 0)\n     */\n    rotate(angle, center) {\n        if (typeof center === 'undefined') {\n            center = new Point(0, 0);\n        }\n        const p = this.subtract(center);\n        const newX = p.x * Math.cos(angle) - p.y * Math.sin(angle);\n        const newY = p.x * Math.sin(angle) + p.y * Math.cos(angle);\n        return new Point(newX, newY).add(center);\n    }\n    /**Create a unit vector with the given angle*/\n    static fromAngle(angle) {\n        const x = Math.cos(angle);\n        const y = Math.sin(angle);\n        return new Point(x, y);\n    }\n}\n\n\n//# sourceURL=webpack://Plotted/./src/point.ts?");

/***/ }),

/***/ "./src/properties.ts":
/*!***************************!*\
  !*** ./src/properties.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Properties\": () => (/* binding */ Properties)\n/* harmony export */ });\n/**@classdesc\n * Parent class to manage the attributes shared by most SVG objects, e.g. fill and stroke.\n*/\nclass Properties {\n    constructor() {\n        this.attributes = new Map();\n    }\n    /**Set fill style */\n    fill(fillStyle) {\n        this.attributes.set('fill', fillStyle);\n        return this;\n    }\n    /**Set stroke style */\n    stroke(strokeStyle) {\n        this.attributes.set('stroke', strokeStyle);\n        return this;\n    }\n    /**Set stroke width */\n    strokeWidth(width) {\n        this.attributes.set('strokeWidth', width.toString());\n        return this;\n    }\n    /**Add a generic attribute */\n    addAttribute(attribute, value) {\n        this.attributes.set(attribute, value);\n        return this;\n    }\n    /**Render the objects properties to a string for SVG export*/\n    properties() {\n        let props = \"\";\n        for (let [k, v] of this.attributes) {\n            props += `${k}=\"${v}\"`;\n        }\n        return props;\n    }\n}\n\n\n//# sourceURL=webpack://Plotted/./src/properties.ts?");

/***/ }),

/***/ "./src/rect.ts":
/*!*********************!*\
  !*** ./src/rect.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Rect\": () => (/* binding */ Rect)\n/* harmony export */ });\n/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties */ \"./src/properties.ts\");\n\nclass Rect extends _properties__WEBPACK_IMPORTED_MODULE_0__.Properties {\n    constructor(position, width, height) {\n        super();\n        this.position = position;\n        this.width = width;\n        this.height = height;\n    }\n    exportSVG() {\n        return `<rect x=\"${this.position.x}\" y=\"${this.position.y}\" width=\"${this.width}\" height=\"${this.height}\" ${this.properties()}/>`;\n    }\n    draw(canvas) {\n        canvas.strokeStyle = this.attributes.get('stroke');\n        canvas.fillStyle = this.attributes.get('fill');\n        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack://Plotted/./src/rect.ts?");

/***/ }),

/***/ "./src/svg.ts":
/*!********************!*\
  !*** ./src/svg.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/point.ts\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line */ \"./src/line.ts\");\n/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rect */ \"./src/rect.ts\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./path */ \"./src/path.ts\");\n\n\n\n\n//Constants for physical distances\nconst INCH = 96;\nconst FOOT = INCH * 12;\nconst MILE = FOOT * 5280;\nconst CENTIMETER = 37.795;\nconst MILLIMETER = CENTIMETER * .1;\nconst METER = CENTIMETER * 100;\nconst KILOMETER = METER * 1000;\nclass SVG {\n    constructor(width, height, canvas) {\n        this.width = width;\n        this.height = height;\n        this.origin = new _point__WEBPACK_IMPORTED_MODULE_0__.Point(0, 0);\n        this.center = new _point__WEBPACK_IMPORTED_MODULE_0__.Point(width / 2, height / 2);\n        this.canvas = canvas;\n        this.objects = [];\n    }\n    exportSVG() {\n        let header = `<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" width=\"${this.width}\" height=\"${this.height}\">`;\n        let body = '';\n        for (let object of this.objects) {\n            body = body.concat(object.exportSVG());\n        }\n        let footer = '</svg>';\n        return header + body + footer;\n    }\n    draw() {\n        for (let object of this.objects) {\n            object.draw(this.canvas);\n        }\n    }\n    line(start, end) {\n        let l = new _line__WEBPACK_IMPORTED_MODULE_1__.Line(start, end);\n        l.stroke('black');\n        this.objects.push(l);\n        return l;\n    }\n    rect(pos, width, height) {\n        let r = new _rect__WEBPACK_IMPORTED_MODULE_2__.Rect(pos, width, height);\n        r.stroke('black');\n        r.fill('none');\n        this.objects.push(r);\n        return r;\n    }\n    path(start) {\n        let p = new _path__WEBPACK_IMPORTED_MODULE_3__.Path(start);\n        p.stroke('black');\n        p.fill('none');\n        this.objects.push(p);\n        return p;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    SVG: SVG,\n    Point: _point__WEBPACK_IMPORTED_MODULE_0__.Point,\n    Line: _line__WEBPACK_IMPORTED_MODULE_1__.Line,\n    Rect: _rect__WEBPACK_IMPORTED_MODULE_2__.Rect,\n    Path: _path__WEBPACK_IMPORTED_MODULE_3__.Path,\n    IN: INCH,\n    FT: FOOT,\n    MI: MILE,\n    MM: MILLIMETER,\n    CM: CENTIMETER,\n    M: METER,\n    KM: KILOMETER,\n});\n\n\n//# sourceURL=webpack://Plotted/./src/svg.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/svg.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});