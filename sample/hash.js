const tool = require("hachiware_tool");

console.log("" + tool.hash());
console.log("salt = abcdefg => " + tool.hash("abcdefg"));
console.log("SHA512 (salt = abcdefg) =>" + tool.hash("abcdefg","sha512"));

console.log("");

console.log("randomHash = " + tool.randomHash());
console.log("randomHash = " + tool.randomHash());

console.log("randomHash (salt = 12345) = " + tool.randomHash("12345"));
console.log("randomHash (salt = 12345) = " + tool.randomHash("12345"));

console.log("randomHash(SHA512) = " + tool.randomHash(null, "sha512"));
console.log("randomHash(SHA512) = " + tool.randomHash(null, "sha512"));
