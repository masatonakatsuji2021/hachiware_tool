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

module.exports = {

	/**
	 * ### getDateFormat
	 * 
	 * Output date and time by specifying date and time format.
	 * Convert shortcode to date and time information.
	 * 
	 * The implementation example is as follows
	 * 
	 * ```javascript
	 * var datestr = tool.getDateFormat("{DATETIME}");
	 * // Output the current date and time like "2021/01/30 11:01:32". 
	 * ```
	 * 
	 * @param {string} format Output date format with shortcode
	 * @param {Date} date Specified date class.  
	 * If not specified, format conversion will be performed using the current date and time.
	 * @returns {string} Converted date format string
	 */
	getDateFormat: function(format, date){

		this.get
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
	 * ### base64Encode
	 * 
	 * Convert to base64 format string
	 * 
	 * @param {string} data Character string to be converted
	 * @returns {string} bas664 encode string
	 */
	base64Encode: function(data){
		var res = Buffer.from(data).toString('base64');
		return res;
	},

	/**
	 * ### base64Decode
	 * 
	 * Decode from base64 format to string.
	 * 
	 * @param {string} stringB64 bas64 encode string 
	 * @returns {string} Character string after decoding
	 */
	base64Decode: function(stringB64){
		var res = Buffer.from(stringB64, 'base64').toString();
		return res;
	},

	/**
	 * ### uniqId
	 * 
	 * Randomly generate a unique and unique character string.
	 * Since it is not a hash conversion, it can also be used with SPA.
	 * 
	 * @param {number} length String length to generate
	 * If not specified, generate with 32 characters.
	 * @returns {string} Generated string
	 */
	uniqId: function(length, noSpecialChar){

		if(!length){
			length = 32;
		}

		var lbn = "";
		if(noSpecialChar){
			lbn = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		}
		else{
			lbn = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=-_.}{,@+*";
		}

		var response = "";

		for(var n = 0 ; n < length ; n++){
			var random = Math.random();
			random = parseInt(random * 1000) % lbn.length;
			response += lbn[random];
		}

		return response;
	},

	/**
	 * ### replaceAll
	 * 
	 * Whole version of replace
	 * 
	 * @param {string} target Character string to be replaced
	 * @param {string} replacement Replacement string
	 * @param {string} source Target character string
	 * @returns {string} Converted string
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
	 * ### hash
	 * 
	 * Hash generation method
	 * * Available only on Node.js, not on SPA
	 * 
	 * @param {string} hashStr Hash generation character
	 * @param {string} hashType Hash conversion format  
	 * If not specified, hash generation with "sha256".
	 * @returns {string} Hash generation string
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
	 * ### sparrow
	 * Create another single thread to handle the process.
	 * 
	 * : The implementation example is as follows
	 * 
	 * ```javascript
	 *  this.sparrow({
	 *		data: {aa:"bbb",ccc:"dd"},
	 *		start: function(number, data ,maxCore){
	 * 				 * 
	 *			var ind = 0;
	 *			for(var n = 0 ; n < 100000000000 ; n++){
	 *				ind++;
	 *			}
	 *		},
	 *		exit: function(){
	 *			console.log("Exit");
	 *		},
	 *	});
	 * ```
	 * 
	 * @param {TransamOption} option Option information. The options that can be set are as follows.
	 * 
	 *  - data     : data to pass to the start callback.
	 *  - start   : The start callback for each thread. The basic logic is described in this.
	 *  - message : Callback in message reception event.
	 *  - error   : Callback when an error occurs.
	 *  - exit    : Callback in event when thread execution ends.
	 * 
	 * @returns {transam} transam class
	 */
	sparrow: function(option){

		if(!option){
			option = {};
		}

		option.limit = 1;
		option.data = [ option.data ];

		return this.transam(option);
	},
	
	/**
	 * ### transam
	 * * Functions available only on Node.js  
	 * Methods to improve performance.  
	 * Temporary performance improvement is possible by starting threads for the number of CPU cores or less in parallel at the same time and distributing the processing.
	 * 
	 * It wraps worker_threads, but devises to simplify the code writing.
	 * 
	 * : The implementation example is as follows
	 * 
	 * ```javascript
	 *  this.transam({
	 *		data: {aa:"bbb",ccc:"dd"},
	 *		start: function(number, data ,maxCore){
	 * 			
	 *			console.log("number = " + number);
	 * 
	 *			var ind = 0;
	 *			for(var n = 0 ; n < 100000000000 ; n++){
	 *				ind++;
	 *			}
	 *		},
	 *		exit: function(number){
	 *			console.log("Exit = " + number);
	 *		},
	 *		finnaly: function(){
	 *			console.log(".....Compelte!");
	 *		},
	 *	});
	 * ```
	 * 
	 * @param {TransamOption} option Option information. The options that can be set are as follows.
	 * 
	 *  - data    : data to pass to the start callback.
	 *  - limit   : Number of threads to deploy  
	 *              If omitted, the number of terminal CPU cores will be automatically assigned.
	 *  - start   : The start callback for each thread. The basic logic is described in this.
	 *  - message : Callback in message reception event.
	 *  - error   : Callback when an error occurs.
	 *  - exit    : Callback in event when thread execution ends.
	 *  - finally : Callback when all threads have finished.
	 * 
	 * @returns {transam} transam class
	 */
	transam: function(option){
		try{
			const { Worker } = require("worker_threads");
		}catch(error){
			throw Error("The transam method is a feature available only in Node.js. \nYou cannot use the transam method in this mode.");
		}

		const os = require("os");

		if(!option){
			option = {};
		}

		if(!option.limit){
			option.limit = os.cpus().length;
		}

		var transam = function(option){

			const { Worker } = require("worker_threads");

			var _data = {};
			var _workers = [];
			var _limit = option.limit;
			var _exitCount = 0;

			/**
			 * ### limit
			 * Number of threads to deploy  
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 		.limit(3)	// <= Use 3 threads.
			 *....
			 * ```
			 * @param {number} limit Number of threads to allocate.
			 * @returns {transam} transam class
			 */
			this.limit = function(limit){
				_limit = limit;
				return this;
			};

			/**
			 * ### data
			 * Specify the data to pass to the thread
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * this.transam()
			 * 		.data({
			 * 			aaa:"bbbb",
			 * 			ccc:"dddd",
			 * 		})
			 *....
			 * ```
			 * 
			 * * Only objects that do not include character strings and callback functions can be specified as data.
			 * 
			 * @param {*} data data to pass to the start callback.
			 * @returns {transam} transam class
			 */
			this.data = function(data){
				_data = data;
				return this;
			};

			const onFinallyCheck = function(){

				if(_exitCount != _limit){
					return;
				}

				if(option.finally){
					option.finally();
				}
			};

			/**
			 * ### start
			 * Specify the callback to be executed at the start of thread startup
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 	.start(function(number, data, maxCpu){
			 * 			
			 * 		console.log("number= = " + number);
			 * 		console.log("max = " + maxCup);
			 * 		console.log(data);
			 * 
			 * 		var ind = 0;
			 * 		for(var n = 0 ; n < 10 ^ 8 ; n++){
			 * 			ind++;
			 * 		}
			 * 	})
			 * ;
			 * ```
			 * 
			 * @param {function} callback The start callback for each thread. The basic logic is described in this.
			 * @returns {transam} transam class
			 */
			this.start = function(callback){

				for(var n = 0 ; n < _limit ; n++){

					var optData = {
						callback: callback.toString(),
						maxLength: _limit,
						number: n,
						data: _data[n],
					};

					var w_ = new Worker(__dirname + "/transam.js",{
						workerData: optData,
					});

					_workers.push(w_);	
				}

				return this;
			};

			/**
			 * ### message
			 * Callback when receiving a message from a thread.
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 	.message(function(message){
			 * 		console.log(message);
			 * 	});
			 * ```
			 * 
			 * @param {function} callback Callback when receiving a message
			 * @returns {transam} transam class
			 */
			this.message = function(callback){

				for(let n = 0 ; n < _limit ; n++){
					var w_ = _workers[n];

					w_.on("message", function(msg){
						callback(n, msg);
					});
				}

				return this;
			};

			/**
			 * ### error
			 * Specify a callback when an error occurs on the thread.
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 	.error(function(exception){
			 * 		console.log(exception);
			 * 	});
			 * ```
			 * 
			 * @param {*} callback 
			 * @returns {transam} transam class
			 */
			this.error = function(callback){
				
				for(let n = 0 ; n < _limit ; n++){
					var w_ = _workers[n];

					w_.on("error", function(exception){
						_exitCount++;
						callback(n, exception);
						onFinallyCheck();
					});
				}

				return this;
			};

			/**
			 * ### exit
			 * Specify a callback at the end of each thread.
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 	.exit(function(number, code){
			 * 		console.log("Exit = " + number + "  Code = " + code);
			 * 	});
			 * ```
			 * 
			 * @param {function} callback Callback at the end of thread processing
			 * @returns {transam} transam class
			 */
			this.exit = function(callback){
				
				for(let n = 0 ; n < _limit ; n++){
					var w_ = _workers[n];
					
					w_.on("exit", function(code){
						_exitCount++;
						callback(n, code);
						onFinallyCheck();
					});
				}

				return this;
			};

			/**
			 * ### finally
			 * Specifies a callback to execute when all threads have finished.
			 * 
			 * The implementation sample is below.
			 * 
			 * ```javascript
			 * tool.transam()
			 * 	.finally(function(){
			 * 		console.log("...Compelete!");
			 * 	});
			 * ```
			 * 
			 * @param {function} callback Callback when all threads have finished
			 * @returns {transam} transam class
			 */
			this.finally = function(callback){
				option.finally = callback;
				return this;
			};

		};

		var tam = new transam(option);

		if(option.data){
			tam.data(option.data);
		}

		if(option.start){
			tam.start(option.start);
		}

		if(option.message){
			tam.message(option.message);
		}

		if(option.error){
			tam.error(option.error);
		}

		if(option.exit){
			tam.exit(option.exit);
		}
		
		if(option.finally){
			tam.finally(option.finally);
		}

		return tam;
	},

};