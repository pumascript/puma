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
    pumaFile += fs.readFileSync(value,'utf8');
  };

  var parsedFile = puma.evalPuma(pumaFile);
  console.log('PumaScript run Successfuly');

  fs.writeFile('./test/grunt-test/tmp/puma-result.js',parsedFile.output,'utf8',function(err){
    if(err) throw err;
    console.log('file saved!');
  });
}
