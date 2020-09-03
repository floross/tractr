// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

module.exports = {
  publicRuntimeConfig: {
    TRACTR_GRAPHQL_PROTO: process.env.TRACTR_GRAPHQL_PROTO,
    TRACTR_GRAPHQL_URL:
      process.env.TRACTR_GRAPHQL_URL || process.env.VERCEL_URL,
    TRACTR_GRAPHQL_ENDPOINT: process.env.TRACTR_GRAPHQL_ENDPOINT,
    TRACTR_DOCKER_SERVER_URL: process.env.TRACTR_DOCKER_SERVER_URL,
  },
};
