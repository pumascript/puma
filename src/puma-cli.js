#!/usr/bin/env node

var program = require('commander'),
    puma = require('../dist/pumascript.js'),
    fs  = require('fs');

program
.usage('<file path>')
.parse(process.argv);

if(!program.args.length){
  program.help();
}else{
  var pathToFile = program.args,
      pumaFile = '';

  for (value of pathToFile){
    fs.readFile(value,'utf8',function(err,data){
      if(err) throw err;
      pumaFile += data;
    });
  }
  
  });
}
