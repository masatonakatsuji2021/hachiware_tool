const tool = require("../");

var b64 = tool.base64Encode("あいうえお0123456789");

console.log(b64);
console.log(tool.base64Decode(b64));