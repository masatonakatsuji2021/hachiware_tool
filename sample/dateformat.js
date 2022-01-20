const tool = require("hachiware_tool");

console.log(tool.getDateFormat("{DATETIME}"));
console.log(tool.getDateFormat("{DATE}"));
console.log(tool.getDateFormat("{TIME}"));
console.log(tool.getDateFormat("{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}"));
console.log(tool.getDateFormat("{YYYY}-{M}-{D} {H}:{m}:{s}"));
console.log(tool.getDateFormat("Week = {W}"));
console.log(tool.getDateFormat("{U}"));

console.log("---");

var d = new Date("1999-12-11 00:00:00");

console.log(tool.getDateFormat("{DATETIME}",d));
console.log(tool.getDateFormat("{DATE}",d));
console.log(tool.getDateFormat("{TIME}",d));
console.log(tool.getDateFormat("{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}",d));
console.log(tool.getDateFormat("{YYYY}-{M}-{D} {H}:{m}:{s}",d));
console.log(tool.getDateFormat("Week = {W}",d));
console.log(tool.getDateFormat("{U}",d));

