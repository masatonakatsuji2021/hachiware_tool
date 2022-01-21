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
var aregment = workerData.aregment;
var number = workerData.number;

const obj = new function(){

    this.send = function(message){
        parentPort.postMessage(message);
        return this;
    };

    this.exit = function(){
        process.exit(0);
    };
};

var c = Function.call(null,"return " + callback)();
c.bind(obj)(aregment, number);