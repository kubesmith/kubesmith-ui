// load the environment variables from dotenv
require('dotenv').config();

// exports
module.exports = {
  NODE_ENV: '"development"',
  API_HOST: `"${process.env.API_HOST}"`,
};
