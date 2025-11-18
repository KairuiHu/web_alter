import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { RotatingText } from "@/components/rotating-text";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
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
        <RotatingText />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <Link
          href="https://console.synvo.ai/"
          className="px-6 py-3 text-base text-white font-medium rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: 'rgb(0, 164, 234)' }}
        >
          Access API Key
        </Link>
        <Link
          href="/docs/overview"
          className={cn(buttonVariants({ variant: "outline" }), "px-6 py-3 text-base")}
        >
          Learn More
        </Link>
      </div>

      {/* Demo and Code Section */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Left: GIF Demo and Key Features */}
          <div className="flex flex-col h-full space-y-6">
            <div className="relative rounded-2xl border-2 border-fd-border bg-fd-muted/30 p-6 shadow-lg">
              <div className="flex items-center justify-center">
                <ThemeAwareImage
                  darkSrc="/assets/synvo_api_dark.gif"
                  lightSrc="/assets/synvo_api_light.gif"
                  alt="Synvo API Demo"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto max-h-[400px] object-contain"
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fd-background px-4 py-1 text-sm font-medium text-fd-foreground shadow-md whitespace-nowrap">
              Two-Step Pipeline to Contextualize Your User
              </div>
            </div>
            
            {/* Key Features */}
            <div className="relative rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fd-background px-4 py-1 text-sm font-medium text-fd-foreground shadow-md">
                Key Features
              </div>
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-sm leading-relaxed">
                    <span className="text-lg">🌐</span> <span className="font-medium"><strong>All-Media Compatibility</strong></span>: Seamlessly process documents, images, videos, and web (e.g., YouTube, Podcasts) — supporting diverse formats in one unified system.
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed">
                    <span className="text-lg">💾</span> <span className="font-medium"><strong>Massive Files Support</strong></span>: Accurately contextualize from thousands of files without compromising quality or speed.
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed">
                    <span className="text-lg">🧠</span> <span className="font-medium"><strong>Contextual Intelligence</strong></span>: For each query, deliver most relevant factual context <span className="text-fd-muted-foreground">(beta)</span>, user profiles <span className="text-fd-muted-foreground">(beta)</span>, and workflow insights <span className="text-fd-muted-foreground">(under dev)</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code Examples */}
          <div className="flex flex-col h-full">
            <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="text-xl font-semibold mb-1">
                  Understand your users{" "}
                  <span className="inline-flex items-center gap-1 text-blue-500 dark:text-blue-400">
                    NOW
                    <Zap className="w-5 h-5" fill="currentColor" />
                  </span>
                  !
                </h3>
                <p className="text-sm text-fd-muted-foreground">
                  First upload the files with the API, then query the API to get the facts.
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <Tabs
                  items={["Step 1: /file/upload", "Step 2: /ai/query"]}
                  className="w-full flex-1 flex flex-col"
                >
                  <Tab value="Step 1: /file/upload">
                    <div className="flex-1 flex flex-col">
                      <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm flex-1">
                        <code>{`import requests, json
API_KEY = "YOUR_SYNVO_API_KEY"
API_HOST = "https://api.synvo.ai"

# Upload file into user1's contextual memory
with open("NTU_Annual_Report_2024.pdf", "rb") as f:
    res = requests.post(
        f"{API_HOST}/file/upload",
        files={"file": f},
        data={"sub_user_name": "user1"}, # Replace with your own user name
        headers={"X-API-Key": API_KEY}
    )

print(json.dumps(res.json(), indent=2))`}</code>
                      </pre>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-fd-muted/50 rounded-lg border border-fd-border">
                          <p className="text-sm text-fd-muted-foreground mb-2">
                            Don't have API key? Click here!
                          </p>
                          <a 
                            href="https://console.synvo.ai/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white rounded-md transition-colors hover:opacity-90"
                            style={{ backgroundColor: 'rgb(0, 164, 234)' }}
                          >
                            🔑 Get YOUR_SYNVO_API_KEY
                          </a>
                        </div>
                        <div className="p-3 bg-fd-muted/50 rounded-lg border border-fd-border">
                          <p className="text-sm text-fd-muted-foreground mb-2">
                            Need a sample to try? Download:
                          </p>
                          <a 
                            href="/assets/NTU_Annual_Report_2024.pdf" 
                            download
                            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-fd-foreground bg-fd-background border border-fd-border rounded-md hover:bg-fd-muted transition-colors"
                          >
                            📄 NTU_Annual_Report_2024.pdf
                          </a>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab value="Step 2: /ai/query">
                    <div className="flex-1 flex flex-col">
                      <pre className="overflow-x-auto rounded-lg bg-fd-muted p-4 text-sm flex-1">
                        <code>{`import requests, json
API_KEY = "YOUR_SYNVO_API_KEY"
API_HOST = "https://api.synvo.ai"

query = "How many patents did NTU file in FY2023?"

payload = {"messages": [{"role": "user", "content": [{"type": "text", "text": query}]}]}
data = {
    "payload": json.dumps(payload),
    "sub_user_name": "user1" # Replace with your own user name
}

res = requests.post(
    f"{API_HOST}/ai/query",
    data=data,
    headers={"X-API-Key": API_KEY},
)

print(json.dumps(res.json(), indent=2))`}</code>
                      </pre>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
