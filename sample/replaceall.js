const tool = require("hachiware_tool");

var string = "{name} .... {name2} or {name} .... {name}";

console.log(tool.replaceAll("{name}","aaaa",string));