webpackJsonp([0],{

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(32);


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(2);
const ReactDOM = __webpack_require__(19);
__webpack_require__(47);
const env = 'dev';
if (env === 'dev') {
    console.info('development mode');
}
ReactDOM.render(React.createElement("div", null, "Hello world!!!"), document.getElementById('content'));


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(21)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./common.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./common.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(undefined);
// imports


// module
exports.push([module.i, "body {\r\n    font-family: 'Oswald', sans-serif;\r\n}\r\n\r\n.container {\r\n    max-width: 1040px;\r\n}\r\n\r\na {\r\n    text-decoration: none;\r\n    color: #4e3c3e;\r\n    outline: none;\r\n}\r\n\r\na:hover {\r\n    text-decoration: none;\r\n}\r\n\r\n.q-title {\r\n    font-size: 28px;\r\n}\r\n\r\n.strech {\r\n    width: 100%;\r\n}\r\n\r\n.margin-y-sm {\r\n    margin: 20px 0;\r\n}\r\n\r\n.margin-y-xs {\r\n    margin: 10px 0;\r\n}\r\n\r\n.margin-x-sm {\r\n    margin: 0 20px;\r\n}", ""]);

// exports


/***/ })

},[31]);