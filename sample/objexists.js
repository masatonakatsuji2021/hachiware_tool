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

console.log("aaa.bbbb = " + tool.objExists(obj,"aaa.bbbb"));
console.log("aaa.nnnn = " + tool.objExists(obj,"aaa.nnnn"));
console.log("aaa.ffff.gg = " + tool.objExists(obj,"aaa.ffff.gg"));
console.log("aaa.ffff.ss = " + tool.objExists(obj,"aaa.ffff.ss"));

console.log(obj);