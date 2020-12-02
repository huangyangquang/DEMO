	// indexOf去重
	function indexOfUniq(arr) {
		var result = [];
		var len = arr.length; 
		for(var i = 0; i < len; i ++) {
			if(result.indexOf(arr[i]) === -1) {
				result.push(arr[i]);
			}
		}
		return result;
	}
	
	var obj = {name: 'jj'};
	var arr = [1, 11, 12, 1, 15, 15, "huang", obj, obj, null, undefined, null]
	console.log(indexOfUniq(arr));