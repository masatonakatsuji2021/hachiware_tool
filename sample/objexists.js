const core = require("../");

var obj = {
	aaa: {
		bbbb: "ccc",
		ddd: "e",
		ffff:{
			gg:"hhh",
			ii:"jjj",
			ss:false,
		},
	},
	f: true,
};

console.log("aaa.bbbb = " + core.exists(obj,"aaa.bbbb"));
console.log("aaa.nnnn = " + core.exists(obj,"aaa.nnnn"));
console.log("aaa.ffff.gg = " + core.exists(obj,"aaa.ffff.gg"));
console.log("aaa.ffff.ss = " + core.exists(obj,"aaa.ffff.ss"));

console.log(obj);