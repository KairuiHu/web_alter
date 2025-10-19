import { createOpenAPI } from "fumadocs-openapi/server";

export const OPENAPI_DEFAULT_SCHEMA_ID = "./public/openapi.yaml";

export const openapi = createOpenAPI({
    input: [OPENAPI_DEFAULT_SCHEMA_ID],
});
