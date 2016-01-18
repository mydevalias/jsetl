function ProcessorWrapper(params){
     eval("var tmpProcessor = function(line, lineIndex){"+params["source"]+";}");
     this.processRef = tmpProcessor;

     eval("var tmpBegin = function(){"+params["begin"]+";}");
     this.beginRef = tmpBegin;

     eval("var tmpEnd = function(){"+params["end"]+";}");
     this.endRef = tmpEnd;
}

ProcessorWrapper.prototype.begin=function(){this.beginRef()};
ProcessorWrapper.prototype.end=function(){this.endRef()};
ProcessorWrapper.prototype.process=function(line, lineIndex){
   this.processRef(line, lineIndex);
}

function loadParams(args){
   var params = {
        "in": "",
        "source": "console.log(line)",
        "begin": "",
        "end": "",
        "processor": ""
   }
    for(var i=2; i < args.length; i+=2){
          params[args[i]]= args[i+1];
       }
       return params;
}

function task(params){
    var lineReader = require("readline").createInterface({
       input: require("fs").createReadStream(params["in"])
    });

    var proc = new ProcessorWrapper(params);

    proc.begin();
    var lineIndex = 0;
    lineReader.on("line", function (line) {
        proc.process(line, lineIndex);
        lineIndex++;
    });

    lineReader.on("close", function(){
       proc.end();
    })
}

var params = loadParams(process.argv);
task(params);
