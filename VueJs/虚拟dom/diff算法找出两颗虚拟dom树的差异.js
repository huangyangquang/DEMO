// diff 函数，对比两棵虚拟dom树
function diff(oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象 patches[index]表示第index个节点的差异记录
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
  var currentPatch = [] // 当前节点的差异记录
  if (typeof (oldNode) === "string" && typeof (newNode) === "string") {
    // 文本内容改变
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  } else if (newNode!=null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 节点相同，比较属性
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // 比较子节点，如果子节点有'ignore'属性，则不需要比较
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
  } else if(newNode !== null){
    // 新节点和旧节点不同，用 replace 替换
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
} 
