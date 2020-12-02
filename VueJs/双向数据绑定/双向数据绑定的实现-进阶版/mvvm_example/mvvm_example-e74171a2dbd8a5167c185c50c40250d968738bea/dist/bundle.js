!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){function n(t){this.data=t,this.walk(t)}function i(t,e){if(t&&"object"==typeof t)return new n(t)}function o(){this.subs=[]}n.prototype={walk:function(t){var e=this;Object.keys(t).forEach(function(n){e.defineReactive(t,n,t[n])})},defineReactive:function(t,e,n){var r=new o;i(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return console.log(e,n,r,o.target),o.target&&r.addSub(o.target),n},set:function(t){t!==n&&(n=t,r.notify())}})}},o.prototype={addSub:function(t){this.subs.push(t)},notify:function(){this.subs.forEach(function(t){t.update()})}},o.target=null,e.observe=i,e.Dep=o},function(t,e,n){window.MVVM=n(2)},function(t,e,n){var i=n(3),{observe:o}=n(0);function r(t){var e=this;this.data=t.data,this.methods=t.methods,Object.keys(this.data).forEach(function(t){e.proxyKeys(t)}),o(this.data),new i(t.el,this)}r.prototype={proxyKeys:function(t){var e=this;Object.defineProperty(this,t,{enumerable:!1,configurable:!0,get:function(){return e.data[t]},set:function(n){e.data[t]=n}})}},t.exports=r},function(t,e,n){var i=n(4);function o(t,e){this.vm=e,this.el=document.querySelector(t),this.fragment=null,this.init()}o.prototype={init:function(){this.el?(this.fragment=this.nodeToFragment(this.el),this.compileElement(this.fragment),this.el.appendChild(this.fragment)):console.log("Dom元素不存在")},nodeToFragment:function(t){for(var e=document.createDocumentFragment(),n=t.firstChild;n;)e.appendChild(n),n=t.firstChild;return e},compileElement:function(t){var e=t.childNodes,n=this;[].slice.call(e).forEach(function(t){var e=/\{\{(.*)\}\}/,i=t.textContent;n.isElementNode(t)?n.compile(t):n.isTextNode(t)&&e.test(i)&&n.compileText(t,e.exec(i)[1]),t.childNodes&&t.childNodes.length&&n.compileElement(t)})},compile:function(t){var e=t.attributes,n=this;Array.prototype.forEach.call(e,function(e){var i=e.name;if(n.isDirective(i)){var o=e.value,r=i.substring(2);n.isEventDirective(r)?n.compileEvent(t,n.vm,o,r):n.compileModel(t,n.vm,o,r),t.removeAttribute(i)}})},compileText:function(t,e){var n=this;console.log("====");var o=this.vm[e];console.log("==="),this.updateText(t,o),new i(this.vm,e,function(e){n.updateText(t,e)})},compileEvent:function(t,e,n,i){var o=i.split(":")[1],r=e.methods&&e.methods[n];o&&r&&t.addEventListener(o,r.bind(e),!1)},compileModel:function(t,e,n,o){var r=this,u=this.vm[n];this.modelUpdater(t,u),new i(this.vm,n,function(e){r.modelUpdater(t,e)}),t.addEventListener("input",function(t){var e=t.target.value;u!==e&&(r.vm[n]=e,u=e)})},updateText:function(t,e){t.textContent=void 0===e?"":e},modelUpdater:function(t,e,n){t.value=void 0===e?"":e},isDirective:function(t){return 0==t.indexOf("v-")},isEventDirective:function(t){return 0===t.indexOf("on:")},isElementNode:function(t){return 1==t.nodeType},isTextNode:function(t){return 3==t.nodeType}},t.exports=o},function(t,e,n){var{Dep:i}=n(0);function o(t,e,n){this.vm=t,this.exp=e,this.cb=n,this.value=this.get()}o.prototype={update:function(){this.run()},run:function(){var t=this.vm.data[this.exp];console.log("Watcher:run",t);var e=this.value;t!==e&&(this.value=t,this.cb.call(this.vm,t,e))},get:function(){console.log("Watcher:get"),i.target=this;var t=this.vm.data[this.exp];return i.target=null,t}},t.exports=o}]);