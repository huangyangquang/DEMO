// 方式：
// 1. offsetTop + scrollTop + innerHeight
// 2. getBoundingClientRect
// 3. IntersectionObserver





function isInViewPortOfOne (el) {
    // viewPortHeight(可视区高度) 兼容所有浏览器写法
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}



// 什么是可视化区域？

// 场景判断： 
// 判断目标元素是否在视窗之内或者和视窗的距离小于一个值（例如 100 px），从而实现一些常用的功能。
	// 例如：
	// 图片的懒加载
	// 列表的无限滚动
	// 计算广告元素的曝光情况
	// 可点击链接的预加载 
	

// 区分 clinetWidth, offsetWidth, scrollWidth



// 什么是scrollTop, offsetTop？
// - scrollTop: 当前元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量
// - offsetTop: 当前元素相对于其 offsetParent 元素的顶部内边距的距离


// offsetTop, offsetWidth是相对与谁而言的距离呢？ 
// - offsetParent


// 什么是offsetParent？ 
// - 指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。
// - offsetTop 和 offsetLeft 都是相对于其内边距边界的。


function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  // return ( // 判断元素完全出现可视区范围内
  //   top >= 0 &&
  //   left >= 0 &&
  //   right <= viewWidth &&
  //   bottom <= viewHeight
  // );

  return !( // 判断元素完全/部分出现可视区范围内
  	top > viewHeight ||
  	right < 0 || 
  	bottom < 0 || 
  	left > viewWidth

  )
}
// 提问： 图片上的边界值需要怎么处理呢？ 解决



// Intersection Observer:
// 介绍：
// Intersection Observer 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，
// 因为不用进行事件的监听，性能方面相比getBoundingClientRect会好很多

// 为什么会性能高些呢？
// Intersection Observer API提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。
// 过去，相交检测通常要用到事件监听，并且需要频繁调用Element.getBoundingClientRect() 方法以获取
// 相关元素的边界信息。事件监听和调用 Element.getBoundingClientRect()  都是在主线程上运行，因此
// 频繁触发、调用可能会造成性能问题。这种检测方法极其怪异且不优雅。
// 
// Intersection Observer API 会注册一个回调函数，每当被监视的元素进入或者退出另外一个元素时(或者
//  viewport )，或者两个元素的相交部分大小发生变化时，该回调方法会被触发执行。这样，我们网站的主线
//  程不需要再为了监听元素相交而辛苦劳作，浏览器会自行优化元素相交管理。

// 有一点要注意：IntersectionObserver 不是完美精确到像素级别，也不是低延时性的。


// 代码实现： 使用步骤主要分为两步 - 创建观察者和传入被观察者
	// 1. 创建观察者
	const options = {
	  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
	  // 1 表示完全被包含
	  threshold: 1.0, 
	  root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
	};

	// 关于callback回调函数常用属性如下：
	const callback = function(entries, observer) { 
	    entries.forEach(entry => {
	        entry.time;               // 触发的时间
	        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
	        entry.boundingClientRect; // 被观察者的位置举行
	        entry.intersectionRect;   // 重叠区域的位置矩形
	        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
	        entry.target;             // 被观察者
	    });
	};

	// 通过new IntersectionObserver创建了观察者 observer
	const observer = new IntersectionObserver(callback, options);

	// 2. 传入被观察者:
	const target = document.querySelector('.target');
	observer.observe(target);



// 案例分析对比：
// 实现：创建了一个十万个节点的长列表，当节点滚入到视窗中时，背景就会从红色变为黄色
// 证明：IntersectionObserver性能更高



// 提问：单原模型（Single Origin Model）和浏览器不会让你获取 iframe 里的任何数据。
// 是什么意思呢？单原模型（Single Origin Model）？？？


// 场景：
// 图片的懒加载
// 列表的无限滚动
// 计算广告元素的曝光情况
// 可点击链接的预加载


// 参考：
// https://mp.weixin.qq.com/s/4ZvBfOiN1o1aXuxoTQpqYQ
// https://mp.weixin.qq.com/s/YDKtj_xEViryhd_iYVrNGA
// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
// https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API