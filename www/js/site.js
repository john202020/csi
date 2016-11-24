webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (csi) {

	  csi.flat();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (factory) {

	    var root = this || (0, eval)('this');

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	            return factory.call(root, root, $);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	        module.exports = factory(root, require("jquery"));
	    } else {
	        return factory(root, root["jQuery"]);
	    }
	})(get);

	function get(root, $) {

	    //indicate elements in the element folder
	    var elemSelector = ".elem";

	    var href = root.document.location.href;

	    root.csi = {};
	    root.csi.flat = function () {

	        $(root.document).ready(function () {
	            $flatElements($, elemSelector).then(function () {

	                if (typeof onReady === "function") {
	                    onReady($);
	                }

	                $("a[href]").removeClass("current").filter(function () {
	                    return href === this.href;
	                }).addClass("current");
	            });
	        });
	    };

	    return root.csi;

	    function $flatElements($, elemSelector) {

	        var t = Date.now();

	        return $getElems($("body"), $.Deferred());

	        function $getElems($context, defer) {

	            if ($context.find(elemSelector).length === 0) {
	                defer.resolve();
	            } else {
	                $getLevel($context).then(function () {
	                    $getElems($context, defer);
	                });
	            }

	            return defer.promise();
	        }

	        function $getLevel($context) {

	            var defer = $.Deferred();
	            var $elems = $context.find(elemSelector);
	            var leng = $elems.length;
	            var html = $context.html();

	            $elems.each(function () {

	                var tagName = this.tagName.toLowerCase();

	                assert_tagname(tagName);

	                var path = tagName.indexOf("-") > -1 ? tagName.replace(/-/g, "/") : tagName;

	                $getHtml(path).then(function (element_html) {

	                    var re = new RegExp("<tag(.*?)<\/tag>".replace(/tag/g, tagName), 'mg');
	                    html = html.replace(re, element_html);

	                    if (--leng <= 0) {
	                        $context[0].innerHTML = html;
	                        defer.resolve();
	                    }
	                });
	            });

	            if (leng === 0) {
	                defer.resolve();
	            }

	            return defer.promise();
	        }

	        function assert_tagname(tagName) {
	            if (tagName.indexOf("--") > -1) {
	                throw Error("tagname of elem cannot contain double separator '--'!");
	            }
	            if (tagName.indexOf("-") === 0) {
	                throw Error("tagname of elem cannot be started with '-'!");
	            }
	            if (tagName.indexOf("-") === tagName.length - 1) {
	                throw Error("tagname of elem cannot be ended with '-'!");
	            }
	        }

	        function $getHtml(tagName) {

	            return $.get(get_url_baseon_current_folder(tagName) + "?t=" + t);
	        }

	        function get_url_baseon_current_folder(tagName) {

	            var path = document.location.pathname;

	            return path.substr(0, path.lastIndexOf("/")) + "/" + tagName + ".html";
	        }
	    }
	}

/***/ }
]);