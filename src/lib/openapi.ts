import { createOpenAPI } from "fumadocs-openapi/server";

export const OPENAPI_DEFAULT_SCHEMA_ID = "./public/openapi.yaml";

// Create a custom OpenAPI configuration that handles server URLs consistently
const openapiConfig = {
    input: [OPENAPI_DEFAULT_SCHEMA_ID],
};

export const openapi = createOpenAPI(openapiConfig);
