const tool = require("../");

var string = "{name} .... {name2} or {name} .... {name}";

console.log(tool.replaceAll("{name}","aaaa",string));