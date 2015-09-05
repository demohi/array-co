/**
 * co array
 */

var co = require('co');
var fs = require('mz/fs');

var paths = ['node_modules/co/', 'node_modules/mz/'];
co(function* () {
  var files = yield paths.map(function(path) {
    return fs.readdir(path);
  });
  var results = [];
  for (var i = 0; i < files.length; i++) {
    results[i] = yield files[i].map(function(file) {
      return fs.exists(file);
    });
  }
  console.log(results);
});

co(function* () {
  var res = yield paths.map(function*(path) {
    var files = yield fs.readdir(path);
    var r = yield files.map(function(file) {
      return fs.exists(file);
    })
    return r;
  })
  console.log(res);
});
