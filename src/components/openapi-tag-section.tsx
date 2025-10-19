import { APIPage } from "fumadocs-openapi/ui";
import { openapi, OPENAPI_DEFAULT_SCHEMA_ID } from "@/lib/openapi";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head", "options"] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

interface OpenAPITagSectionProps {
    tag: string;
    schemaId?: string;
}

type DereferencedOperation = {
    tags?: string[];
};

type DereferencedDocument = {
    paths?: Record<string, Partial<Record<HttpMethod, DereferencedOperation>>>;
    webhooks?: Record<string, Partial<Record<HttpMethod, DereferencedOperation>>>;
};

type SchemaRecord = Record<string, { dereferenced: DereferencedDocument }>;

function selectOperations(schema: DereferencedDocument, tag: string) {
    const operations: Array<{ path: string; method: HttpMethod }> = [];
    const webhooks: Array<{ name: string; method: HttpMethod }> = [];

    for (const [path, pathItem] of Object.entries(schema.paths ?? {})) {
        for (const method of HTTP_METHODS) {
            const operation = pathItem?.[method];
            if (!operation) continue;
            if (!operation.tags || operation.tags.includes(tag)) {
                operations.push({ path, method });
            }
        }
    }

    for (const [name, hookItem] of Object.entries(schema.webhooks ?? {})) {
        for (const method of HTTP_METHODS) {
            const webhook = hookItem?.[method];
            if (!webhook) continue;
            if (!webhook.tags || webhook.tags.includes(tag)) {
                webhooks.push({ name, method });
            }
        }
    }

    return { operations, webhooks };
}

export async function OpenAPITagSection({ tag, schemaId = OPENAPI_DEFAULT_SCHEMA_ID }: OpenAPITagSectionProps) {
    const schemas = (await openapi.getSchemas()) as SchemaRecord;
    const schema = schemas[schemaId];

    if (!schema) {
        throw new Error(`OpenAPI schema "${schemaId}" not found. Did you configure lib/openapi.ts correctly?`);
    }

    const { operations, webhooks } = selectOperations(schema.dereferenced, tag);

    if (operations.length === 0 && webhooks.length === 0) {
        return (
            <div className="not-prose rounded-md border border-dashed border-fd-muted-foreground/40 bg-fd-card/40 p-4 text-sm text-fd-muted-foreground">
                No operations with tag "{tag}" were found in the OpenAPI schema.
            </div>
        );
    }

    const props = await openapi.getAPIPageProps({
        document: schemaId,
        hasHead: false,
        operations,
        webhooks,
    });

    return <APIPage {...props} />;
}
