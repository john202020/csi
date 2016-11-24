"use strict";


(function (factory) {

    var root = this || (0, eval)('this');

    if (typeof define === "function" && define.amd) {
        define(["jquery"], function ($) { return factory.call(root, root, $); });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(root, require("jquery"));
    }
    else {
        return factory(root, root["jQuery"]);
    }
}(get));


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
            }
            else {
                $getLevel($context)
                    .then(function () {
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

                var path = (tagName.indexOf("-") > -1) ? tagName.replace(/-/g, "/") : tagName;
                
                $getHtml(path)
                    .then(function (element_html) {

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

