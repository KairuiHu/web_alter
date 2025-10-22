import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 py-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Image
            src="/assets/logo-only.svg"
            alt="Synvo Logo"
            width={64}
            height={64}
            className="align-top"
          />
          <h1 className="text-4xl font-bold sm:text-5xl">Synvo API</h1>
        </div>
        <p className="text-fd-muted-foreground text-balance">
          Multimodal Contextualization System for AI Agents.
          Synvo AI adds long-term memory, deep contextual understanding, 
          and on-device performance for AI Agents.
          Faster, smarter, and truly human-aware.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className={cn(buttonVariants({ color: "primary" }), "px-4 py-2")}
        >
          Get Started
        </Link>
      </div>

      {/* Features and Code Examples Side by Side */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Advanced AI Capabilities
            </h2>
            <p className="mb-4 text-fd-muted-foreground">Key Features:</p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Persistent Memory</h3>
                <p className="text-sm text-fd-muted-foreground">
                  Enables AI to retain and recall context across sessions, delivering consistent and coherent understanding over time.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Contextual Intelligence</h3>
                <p className="text-sm text-fd-muted-foreground">
                  Transforms unstructured multimodal data into structured context that makes AI responses more accurate and human-like.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Tabs
              items={["Upload File", "Get Context"]}
              className="w-full"
            >
              <Tab value="Upload File">
                <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm">
                  <code>{`# Upload document into contextual memory
api_key = "YOUR_SYNVO_API_KEY"
with open("document.pdf", "rb") as f:
    response = requests.post(
        "https://api.synvo.ai/file/upload",
        files={"file": f},
        data={
            "path": "/"
        },
        headers={"X-API-Key": api_key}
    )

file_id = response.json()["file_id"]`}</code>
                </pre>
              </Tab>
              <Tab value="Get Context">
                <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm">
                  <code>{`# Get query-related context
api_key = "YOUR_SYNVO_API_KEY"
query = "The author of the document"
payload = {
    "messages": [{
        "role": "user",
        "content": [
            {"type": "text", "text": query},
        ]
    }]
}

response = requests.post(
    "https://api.synvo.ai/ai/query", 
    data={
        "payload": json.dumps(payload),
        "model": "synvo"
    },
    headers={"X-API-Key": api_key}
)`}</code>
                </pre>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
