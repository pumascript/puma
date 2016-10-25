#!/usr/bin/env node

var program = require('commander'),
    puma = require('../dist/pumascript.js'),
    fs  = require('fs');

program
.usage('<output> <filePaths ...>')
.option('-o, --output <output>','Name and path of the output file')
.parse(process.argv);

//can be major than two coz the first args are the path for the output
if (!program.args.length) {
    program.help();
}
else{
  if(program.output){
    var pumaFile = '';

    program.args.forEach(function(file){
      pumaFile += fs.readFileSync(file,'utf8');
    });

    var parsedFile = puma.evalPuma(pumaFile);
    console.log('PumaScript run Successfuly');

    fs.writeFile(program.output, parsedFile.output, 'utf8', function(err){
      if(err) throw err;
      console.log('File Saved!');
    });
  }
  else {
    console.log("Specify a destination output");
  }
}
