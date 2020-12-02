/**
 * Element virdual-dom 对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点  ==> 元素节点， 文本节点
 */
function Element(tagName, props, children) { // 虚拟节点构造函数
    this.tagName = tagName
    this.props = props
    this.children = children
    // dom 元素的 key 值，用作唯一标识符
    if(props.key){
       this.key = props.key
    }
    var count = 0
    children.forEach(function (child, i) {
        if (child instanceof Element) { // 判断每一个子节点是不是一个虚拟节点
            count += child.count
        } else { 
            children[i] = '' + child // 把子节点变成一个文本节点（数字 ==> 字符串）
        }
        count++
    })
    // 子元素个数(直接元素及子孙元素)
    this.count = count
}

function createElement(tagName, props, children){
 return new Element(tagName, props, children);
}

module.exports = createElement;
