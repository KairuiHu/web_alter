import { generateFiles } from "fumadocs-openapi";
import { openapi } from "@/lib/openapi";

await generateFiles({
    input: openapi,
    output: "./content/docs/synvo-api/openapi",
    includeDescription: true,
});
