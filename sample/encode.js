const tool = require("hachiware_tool");

var data = "abcdefg";

var enc = tool.encode(data);

console.log("Encode = " + enc);

var decdata = tool.decode(enc);

console.log("Decode = " + decdata);

console.log("---------------------");

var data = "abcdefg";

var key = tool.randomHash();

var option = {
    key:key,
};
var enc = tool.encode(data, option);

console.log("Encode = " + enc);

var decdata = tool.decode(enc, option);

console.log("Decode = " + decdata);
