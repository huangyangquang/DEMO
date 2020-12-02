// 消息订阅器 Dep:
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;


// 订阅者 Watcher：
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this; // 全局变量 订阅者 赋值
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null; // 全局变量 订阅者 释放
        return value;
    }
};



// 作者：我是你的超级英雄
// 链接：https://juejin.im/post/5d421bcf6fb9a06af23853f1
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。