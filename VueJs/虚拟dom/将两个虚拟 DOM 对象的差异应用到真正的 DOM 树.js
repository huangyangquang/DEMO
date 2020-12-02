function patch (node, patches) {
  var walker = {index: 0}
  dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
  // 从patches拿出当前节点的差异
  var currentPatches = patches[walker.index]

  var len = node.childNodes
    ? node.childNodes.length
    : 0
  // 深度遍历子节点
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }
  // 对当前节点进行DOM操作
  if (currentPatches) {
    applyPatches(node, currentPatches) //应用补丁
  }
} 

function applyPatches (node, currentPatches) {
  // 遍历两个虚拟dom之间的差异
  currentPatches.forEach(currentPatch => {
    switch (currentPatch.type) { // 差异类型
      case REPLACE: // 替换
        var newNode = (typeof currentPatch.node === 'string')
          ? document.createTextNode(currentPatch.node)
          : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node) // 替换
        break
      case REORDER: // reorder 重新排序
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS: // 属性
        setProps(node, currentPatch.props)
        break
      case TEXT: // 文本
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
} 

