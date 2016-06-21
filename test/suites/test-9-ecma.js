define(['pumascript', 'esprima'], function(puma, esprima) {

  test("toBoolean conversion test", function () {
    var result = puma.evalPuma("Boolean(undefined)");
    ok(result.success && false === result.value, "Pass!");
  });

});
