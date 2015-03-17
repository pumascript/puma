 set CURDIR=%CD%
 
 %CURDIR%\phantom\phantomjs.exe %CURDIR%\run-qunit.js file:///%CURDIR%/test.html 
 
 PAUSE