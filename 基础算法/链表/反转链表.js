function Node(value) {
	this.value = value;
	this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

// 递归
var reverseList = function(head) {
	if(head == null) {
		return;
	}
	if(head.next.next !== null) {
		reverseList(head.next);
	}
	head.next.next = head;
	head.next = null;
};

// console.log(node1);
// reverseList(node1);
// console.log(node5);


// 迭代
function nzhi(head) {
	var cur = head;
	var pre = null;
	while(cur != null) {
		var next = cur.next;
		cur.next = pre;
		pre = cur;
		cur = next;
	}
}

// nzhi(node5);
// console.log(node1);



// 默写（全对）
function nizhi(node) {
	if(node == null) return node;
	if(node.next.next !== null) {
		nizhi(root.next)
	}
	root.next.next = root;
	root.next = null;
}