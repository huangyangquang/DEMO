function MyPromise (executor) {
	var self = this;
	// 等待状态
	self.status = 'pending';
	// 参数
	self.resolveValue = null;
	self.rejectReason = null;
	// 存成功的回调函数
	self.ResolveCallBackList = [];
	// 存失败的回调函数
	self.RejectCallBackList = [];
	function resolve (val) {
		if(self.status === 'pending') {
			self.status = 'Fulfilled';
			self.resolveValue = val;
			self.ResolveCallBackList.forEach(function (ele) {
				ele();
			});
		}
	}
	function reject (reason) {
		if(self.status === 'pending') {
			self.status = 'Rejected';
			self.rejectReason = reason;
			self.RejectCallBackList.forEach(function (ele) {
				ele();
			});
		}
	}

	try {
		executor(resolve, reject);
	} catch(e) {
		reject(e);
	}
};





