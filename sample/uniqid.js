const tool = require("../");

for(var n = 0 ; n < 10 ; n++){
	console.log(tool.uniqId());
}

console.log("");

for(var n = 0 ; n < 10 ; n++){
	console.log(tool.uniqId(64));
}
