// 双层循环比对
	function doubleLoopUniq(arr) {
		var result = [];
			len = arr.length;
			isExist = true;
			
		for(var i = 0; i < len; i ++) {
			isExist = true;
			for(var j = 0; j < result.length; j ++) {
				if(result[j] === arr[i]) {
					isExist = false;
					break;
				}
			}
			isExist && result.push(arr[i]);
		}
		return result;
	}

	var obj = {name: 'jj'};
	var arr = [1, 11, 12, 1, 15, 15, "huang", obj, true, true, "true", obj, null, undefined, null]
	console.log(doubleLoopUniq(arr));