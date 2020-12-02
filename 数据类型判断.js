function type(target) {
	var ret = typeof(target);
	var template = {
		'[object Array]' : 'array',
		'[object Object]' : 'object',
		'[object Number]' : 'number - object',
		'[object String]' : 'string - object',
		'[object Boolean]' : 'boolean - object'
	}
	if(target === null) {
		return 'null';
	}
	if(ret == 'object') {
		var str = Object.prototype.toString.call(target);
		return template[str];
	}else{
		return ret;
	}
}
