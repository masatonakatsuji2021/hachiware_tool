/**
 * ===================================================================================================
 * Hachiware_tool
 * 
 * Extension library for web framework "Hachiware ".
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/Hachiware_tool
 * npm     : https://www.npmjs.com/package/Hachiware_tool
 * ===================================================================================================
 */

const { workerData, parentPort } = require("worker_threads");

var callback = workerData.callback;
var data = workerData.data;
var number = workerData.number;
var maxLength = workerData.maxLength;
var c = Function.call(null,"return " + callback)();

const transamField = function(){

    this.send = function(message){
        parentPort.postMessage(message);
        return this;
    };

    this.exit = function(){
        process.exit();
    };

    this.end = function(){
        process.exit();
    };
};

var t_ = new transamField();
c.bind(t_)(number, data, maxLength);