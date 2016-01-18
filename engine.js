function loadParams(args){
   var params = {
        "in.file": "",
        "source": "console.log(line)"
   }
    for(var i=2; i < args.length; i+=2){
          params[args[i]]= args[i+1];
       }
       return params;
}

var params = loadParams(process.argv);

var lineReader = require("readline").createInterface({
   input: require("fs").createReadStream(params["in.file"])
});

var f = "var x = function(line){"+params["source"]+";}"
eval(f);

lineReader.on("line", function (line) {
    x(line);
});
