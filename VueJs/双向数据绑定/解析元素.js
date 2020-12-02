// 解析器Compile：

/*
解析了v-model指令, v-on指令 和 {{}}
exp：是 node 节点的 v-model 等指令的属性值 或者插值符号中的属性。
如 v-model="name"，exp 就是name;

大概思路：
解析模板指令，并替换模板数据，初始化视图；
将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器；

缺点： 
好像没有解析v-bind, v-html等其他的指令, v-bind:src, v-bind:class... 
不需要解析v-bind等，因为这些最后会作为一个文本绑定
*/
function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if (self.isElementNode(node)) {  // 元素节点
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) { // 文本节点
                self.compileText(node, reg.exec(text)[1]); // 解析文本节点
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function(node) { // 解析元素节点
        var nodeAttrs = node.attributes; // 获取元素所有属性
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function(attr) { // 遍历元素上的属性
            var attrName = attr.name; 
            if (self.isDirective(attrName)) { 
                var exp = attr.value;
                var dir = attrName.substring(2); 
                if (self.isEventDirective(dir)) {  // 事件指令
                    self.compileEvent(node, self.vm, exp, dir); // 解析事件
                } else {  // v-model 指令
                    self.compileModel(node, self.vm, exp, dir); // 解析v-models
                }
                node.removeAttribute(attrName); // 移除属性
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText); // 替换模板数据，初始化视图
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) { // 解析实际按
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp]; // 获取指令上的属性值
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) { //初始化相应的订阅器
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function(e) { // 监听input事件
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) { // 更新文本节点数据
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    modelUpdater: function(node, value, oldValue) { // 更新输入框数据
        node.value = typeof value == 'undefined' ? '' : value;
    },
    isDirective: function(attr) { // 指令解析 动态绑定特性 v-model
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function(dir) { // 指令解析 事件绑定
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) { //判断节点是不是元素
        return node.nodeType == 1;
    },
    isTextNode: function(node) { //判断节点是不是文本
        return node.nodeType == 3;
    }
}