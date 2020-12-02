/**
 * render 将virdual-dom 对象渲染为实际 DOM 元素
 */
Element.prototype.render = function () { // 构造函数Element原型上的方法
    var el = document.createElement(this.tagName)
    var props = this.props
    // 设置节点的DOM属性
    for (var propName in props) {
        var propValue = props[propName]
        el.setAttribute(propName, propValue) // 设置真实dom元素上的属性
    }

    var children = this.children || []
    children.forEach(function (child) {
        var childEl = (child instanceof Element)
            ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
            : document.createTextNode(child) // 如果字符串，只构建文本节点
        el.appendChild(childEl)
    })
    return el // 返回真实的dom节点
} 
