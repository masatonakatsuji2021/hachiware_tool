const fs = require("fs");

module.exports = function(){

    var syncStr = fs.readFileSync(__dirname + "/index.js").toString();
    syncStr = syncStr.split("module.exports = ")[1];

    syncStr = syncStr.replace("Buffer.from(data).toString('base64');","btoa(unescape(encodeURIComponent(data)));");
    syncStr = syncStr.replace("Buffer.from(stringB64, 'base64').toString();","decodeURIComponent(escape(atob(stringB64)));");

    return syncStr;
};