/**
 * ===================================================================================================
 * Hachiware_tool
 * 
 * Extension library for web framework "Hachiware ".
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/Hachiware_tool
 * npm     : https://www.npmjs.com/package/Hachiware_tool
 * ===================================================================================================
 */

const { ifError } = require("assert");

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
		var res = Buffer.from(data).toString('base64');
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

		if(this.objGet(object, path) !== undefined){
			return true;
		}
		else{
			return false;
		}
	},

	/**
	 * objGet
	 * @param {*} object 
	 * @param {*} path 
	 * @returns 
	 */
	objGet: function(object, path){

		var obj = new Object(object);

		var paths = path.split(".");
		for(var n = 0 ; n < paths.length ; n++){
			var p_ = paths[n];

			if(obj[p_] === undefined){
				return undefined;
			}

			obj = obj[p_];
		}

		if(obj != undefined){
			return obj;
		}
	},

	/**
	 * objSet
	 * @param {*} object 
	 * @param {*} path 
	 * @param {*} value 
	 * @returns 
	 */
	objSet: function(object, path, value){

		var obj = new Object(object);

		var paths = path.split(".");
		var firstPath = paths[0];

		if(obj[firstPath] === undefined){
			obj[firstPath] = {};
		}

		paths.shift();

		var nPath = paths.join(".");

		if(paths.length >= 1){
			obj[firstPath] = this.objSet(obj[firstPath],nPath, value);
		}
		else{
			obj[firstPath] = value;
		}

		return obj;
	},

	/**
	 * ucFirst
	 * @param {*} str 
	 * @returns 
	 */
	ucFirst: function(str){
		return str.substring(0,1).toUpperCase() + str.substring(1);
	},

	/**
	 * lcFirst
	 * @param {*} str 
	 * @returns 
	 */
	lcFirst: function(str){
		return str.substring(0,1).toLowerCase() + str.substring(1);
	},

	/**
	 * hash
	 * @param {*} hashStr 
	 * @param {*} hashType 
	 * @returns 
	 */
	hash: function(hashStr, hashType){
		const crypto = require("crypto");

		if(!hashStr){
			hashStr = "";
		}

		if(!hashType){
			hashType = "sha256";
		}

		return crypto.createHash(hashType).update(hashStr).digest("hex");
	},

	/**
	 * randomHash
	 * @param {*} hashStr 
	 * @param {*} hashType 
	 * @returns 
	 */
	randomHash: function(hashStr, hashType){
		var d = new Date();

		var random = Math.random();
		hashStr += random.toString();

		return this.hash(hashStr, hashType);
	},

	/**
	 * _encOptSet
	 * @param {*} option 
	 * @returns 
	 */
	_encOptSet: function(option){

		if(!option){
			option = {};
		}

		if(!option.key){
			option.key = "123456";
		}

		if(!option.salt){
			option.salt = "abcdefg";
		}

		if(!option.ivSalt){
			option.ivSalt = "0123456789ABCDEF";
		}

		if(!option.method){
			option.method = "aes-256-cbc";
		}

		if(!option.inputEncode){
			option.inputEncode = "utf8";
		}

		if(!option.outputEncode){
			option.outputEncode = "hex";
		}

		return option;
	},

	/**
	 * encode
	 * @param {*} data 
	 * @param {*} option 
	 * @returns 
	 */
	encode: function(data, option){

		option = this._encOptSet(option);

		const crypto = require("crypto");

		const key = crypto.scryptSync(option.key, option.salt, option.ivSalt.length * 2);
		const iv = Buffer.from(option.ivSalt);

		const cipher = crypto.createCipheriv(option.method, key ,iv);

		var response = cipher.update(data, option.inputEncode, option.outputEncode);
		response += cipher.final(option.outputEncode);

		return response;
	},

	/**
	 * decode
	 * @param {*} data 
	 * @param {*} option 
	 * @returns 
	 */
	decode: function(data, option){

		option = this._encOptSet(option);

		const crypto = require("crypto");

		const key = crypto.scryptSync(option.key, option.salt, option.ivSalt.length * 2);
		const iv = Buffer.from(option.ivSalt);

		const cipher = crypto.createDecipheriv(option.method, key ,iv);

		var response = cipher.update(data, option.outputEncode, option.inputEncode);
		response += cipher.final(option.inputEncode);

		return response;
	},

	/**
	 * transam
	 * @param {*} option 
	 * @returns 
	 */
	transam: function(option){
		const { Worker } = require("worker_threads");

		if(!option.limit){
			option.imit = 1;
		}

		if(!option.callback){
			option.callback = function(){};
		}

		var optData = {
			aregment: option.data,
			callback: option.callback.toString(),
		};

		for(var n = 0 ; n < option.limit ; n++){

			optData.number = n;

			var w = new Worker(__dirname + "/worker.js",{
				workerData: optData,
				callback: option.callback,
			});	

			w.on("message",function(message){
				if(option.onMessage){
					option.onMessage(message);
				}
			});
	
			w.on("exit",function(code){
				if(option.onExit){
					option.onExit(code);
				}
			});

		}

	},

};