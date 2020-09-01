// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

module.exports = {
  publicRuntimeConfig: {
    TRACTR_GRAPHQL_ENDPOINT:
      process.env.TRACTR_GRAPHQL_ENDPOINT || process.env.VERCEL_URL,
  },
};
