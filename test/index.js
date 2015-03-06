var test = require('tape')
  , envstache = require('../')

test('replaces environment variables', function(t) {
  var stream = envstache.custom({RELEASE_URL: 'http://example.com/test'})
    , buffer = []

  stream()
    .on('data', function(d) { buffer.push(d) })
    .on('end', function() {
      var data = buffer.join('')
      t.equal(-1, data.indexOf('RELEASE_URL'), 'removes variable')
      t.notEqual(-1, data.indexOf('http://example.com/test'), 'replaces with value')
      t.end()
    })
    .end('{{{ RELEASE_URL }}}')
})
