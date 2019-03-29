// external dependencies
const path = require('path');

// exports
module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir);
  },
};
