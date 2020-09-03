import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const SERVERLESS_URL = `${publicRuntimeConfig.TRACTR_GRAPHQL_PROTO}://${publicRuntimeConfig.TRACTR_GRAPHQL_URL}${publicRuntimeConfig.TRACTR_GRAPHQL_ENDPOINT}`;
export const DOCKER_SERVER_URL = `${publicRuntimeConfig.TRACTR_DOCKER_SERVER_URL}`;
