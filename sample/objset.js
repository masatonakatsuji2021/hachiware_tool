const tool = require("../");

var obj = {};

obj = tool.objSet(obj,"aaa.bbb.cccc","dd");

console.log(obj);

obj = tool.objSet(obj,"aaa.eee","ff");

console.log(obj);

obj = tool.objSet(obj,"aaa.bbb.gggg","hh");

console.log(obj);

obj = tool.objSet(obj,"aaa.ssss",true);

console.log(obj);

obj = tool.objSet(obj,"nnnn",false);

console.log(obj);
