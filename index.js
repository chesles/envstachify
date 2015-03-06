var through = require('through2')
  , mustache = require('mustache')

function custom(context) {
  context = context || process.env || {}

  return function(file, args) {
    var buffer = []

    return through(write, flush)

    function write(chunk, enc, cb) {
      buffer.push(chunk)
      cb()
    }

    function flush(cb) {
      var src = buffer.join('')

      this.push(mustache.render(src, context))
      cb()
    }
  }
}

module.exports = custom(process.env)
module.exports.custom = custom
