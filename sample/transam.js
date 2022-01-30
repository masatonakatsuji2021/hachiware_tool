const tool = require("hachiware_tool");

var d = new Date();
var start = d.getTime();

var _value = 8000000000;

const normal = function(){

    console.log("START");

    var ind = 0;
    for(var n = 0; n < _value ; n++){
        ind++;
    }

    console.log("...Complete");
    var d = new Date();
    var end = d.getTime();
    console.log("TIME = " + (end-start) + "ms");

};
const sparrow = function(){

    tool.sparrow({
        data: _value,
        start: function(number, data){
            
            console.log("START");

            var ind = 0;
            for(var n = 0 ; n < data ; n++){
                ind++;
            }

        },
        exit: function(){
            var d = new Date();
            var end = d.getTime();
            console.log("...Complete TIME = " + (end-start) + "ms");
        },
    });

};
const transam = function(){

    tool.transam({
        data:[
            _value,
            _value,
            _value,
            _value,
        ],
        start: function(number, data, maxCpu){
    
            console.log("START Number = " + number);

            var ind = 0;
            for(var n = 0; n < data / maxCpu ; n++){
                ind++;
            }  

        },
        exit: function(number){
            var d = new Date();
            var end = d.getTime();
            console.log("...Exit Number = " + number + " TIME = " + (end-start) + "ms");
        },
        finally: function(){
            var d = new Date();
            var end = d.getTime();
            console.log("...Complete TIME = " + (end-start) + "ms");
        },
    });
};

normal();
// sparrow();
// transam();


console.log("......");
