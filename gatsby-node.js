const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        common: path.resolve(__dirname, 'src/common'),
        data: path.resolve(__dirname, 'src/data'),
        layouts: path.resolve(__dirname, 'src/layouts'),
      },
    },
  });
};
