import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 py-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Image
            src="/assets/logo-only.svg"
            alt="Synvo Logo"
            width={48}
            height={48}
            className="align-top"
          />
          <h1 className="text-3xl font-bold sm:text-4xl">Synvo API</h1>
        </div>
        <p className="mb-8 text-fd-muted-foreground text-balance text-lg">
          Synvo API enables AI agents with deep multimodal contextual understanding, enhancing performance through accurate context retrieval from diverse user data.
        </p>
      </div>

      {/* Demo and Code Section */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Left: GIF Demo */}
          <div className="flex flex-col h-full">
            <div className="relative rounded-2xl border-2 border-fd-border bg-fd-muted/30 p-6 shadow-lg flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/assets/synvo_api.gif"
                  alt="Synvo API Demo"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto max-h-[400px] object-contain"
                  priority
                />
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fd-background px-4 py-1 text-sm font-medium text-fd-foreground shadow-md">
                Live Demo
              </div>
            </div>
          </div>

          {/* Right: Code Examples */}
          <div className="flex flex-col h-full">
            <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Try It Yourself</h3>
                <p className="text-sm text-fd-muted-foreground">
                  Copy and run these code examples to get started
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <Tabs
                  items={["Upload File", "Get Context"]}
                  className="w-full flex-1 flex flex-col"
                >
                  <Tab value="Upload File">
                    <div className="flex-1 flex flex-col">
                      <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm flex-1">
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
                    </div>
                  </Tab>
                  <Tab value="Get Context">
                    <div className="flex-1 flex flex-col">
                      <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm flex-1">
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
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://console.synvo.ai/"
          className={cn(buttonVariants({ color: "primary" }), "px-6 py-3 text-base")}
        >
          Access API Key
        </Link>
        <Link
          href="http://docs.synvo.ai/docs/1.0/quick-start"
          className={cn(buttonVariants({ variant: "outline" }), "px-6 py-3 text-base")}
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
