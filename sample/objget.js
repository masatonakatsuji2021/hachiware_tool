const tool = require("hachiware_tool");

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

console.log("aaa.bbbb = " + tool.objGet(obj,"aaa.bbbb"));
console.log("aaa.nnnn = " + tool.objGet(obj,"aaa.nnnn"));
console.log("aaa.ffff.gg = " + tool.objGet(obj,"aaa.ffff.gg"));
console.log("aaa.ffff.ss = " + tool.objGet(obj,"aaa.ffff.ss"));

console.log(obj);