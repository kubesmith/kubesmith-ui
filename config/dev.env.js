// load the environment variables from dotenv
require('dotenv').config();

// exports
module.exports = {
  NODE_ENV: '"development"',
  API_URL: `"${process.env.API_URL}"`,
};
