/**
 * 
 */
module.exports = {

	/**
	 * getDateFormat
	 * @param {*} format 
	 * @param {*} date 
	 * @returns 
	 */
	getDateFormat: function(format, date){

		if(!date){
			date = new Date();
		}

		var response = format;

		response = response.replace("{DATETIME}", "{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}");
		response = response.replace("{DATE}", "{YYYY}/{MM}/{DD}");
		response = response.replace("{TIME}", "{HH}:{mm}:{ss}");

		response = response.replace("{YYYY}", date.getFullYear());
		response = response.replace("{MM}", ("0" + (date.getMonth() + 1)).slice(-2));
		response = response.replace("{M}", date.getMonth() + 1);
		response = response.replace("{DD}", ("0" + date.getDate()).slice(-2));
		response = response.replace("{D}",  date.getDate());

		response = response.replace("{W}",  date.getDay());

		response = response.replace("{HH}", ("0" + date.getHours()).slice(-2));
		response = response.replace("{H}", date.getHours());
		response = response.replace("{mm}", ("0" + date.getMinutes()).slice(-2));
		response = response.replace("{m}", date.getMinutes());
		response = response.replace("{ss}", ("0" + date.getSeconds()).slice(-2));
		response = response.replace("{s}", date.getSeconds());

		response = response.replace("{U}", date.getTime());

		return response;
	},

	/**
	 * base64Encode
	 * @param {*} data 
	 * @returns 
	 */
	base64Encode: function(data){
		var res = Buffer.from(data).toString('base64') ;
		return res;
	},

	/**
	 * base64Decode
	 * @param {*} stringB64 
	 * @returns 
	 */
	base64Decode: function(stringB64){
		var res = Buffer.from(stringB64, 'base64').toString();
		return res;
	},

	/**
	 * uniqId
	 * @param {*} length 
	 * @returns 
	 */
	uniqId: function(length){

		if(!length){
			length = 32;
		}

		const lbn = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=-_.}{,@+*";

		var response = "";

		for(var n = 0 ; n < length ; n++){
			var random = Math.random();
			random = parseInt(random * 1000) % lbn.length;
			response += lbn[random];
		}

		return response;
	},

	/**
	 * replaceAll
	 * @param {*} target 
	 * @param {*} replacement 
	 * @param {*} source 
	 * @returns 
	 */
	replaceAll: function(target,replacement,source){
		return source.split(target).join(replacement);
	},

	/**
	 * objExists
	 * @param {*} object 
	 * @param {*} path 
	 * @returns 
	 */
	objExists: function(object, path){

		var obj = new Object(object);

		var paths = path.split(".");
		for(var n = 0 ; n < paths.length ; n++){
			var p_ = paths[n];

			if(obj[p_] == undefined){
				return false;
			}

			obj = obj[p_];
		}

		if(obj != undefined){
			return true;
		}
	},

};