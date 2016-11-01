#!/usr/bin/env node

var program = require('commander'),
    puma = require('../dist/pumascript.js'),
    fs  = require('fs');

program
.usage('<output> <filePaths ...>')
.option('-o, --output <output>','Name and path of the output file')
.parse(process.argv);

if (!program.args.length) {
    program.help();
}
else{
  if(program.output){
    var pumaFile = '';

    program.args.forEach(function(file){
      console.info('Processing: ',file,' file.');
      pumaFile += fs.readFileSync(file,'utf8');
    });

    var parsedFile = puma.evalPuma(pumaFile);

    fs.writeFile(program.output, parsedFile.output, 'utf8', function(err){
      if(err) throw err;
      console.log('File Saved!');
    });
  }
  else {
    console.log("Specify a destination output") ;
  }
}
