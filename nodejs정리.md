### CommonJs
>// file: example.js
const foo = require('./foo');
console.log(foo.bar());
// file: foo.js
exports.bar = function() {
  return 'Hello from foo.js';
}

###