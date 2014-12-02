CURDIR=$(pwd)

echo $CURDIR

phantomjs run-qunit.js file://$CURDIR/test.html