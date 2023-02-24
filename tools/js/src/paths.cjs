const path = require('path');

const root = path.resolve(__dirname, '../../../');

const Paths = {
  packages: (dir) => path.resolve(root, './packages', dir)
};

module.exports = {
  Paths
};
