import { agentGuide } from "@/lib/agent-guide";

export const dynamic = "force-static";
export function GET() {
  return new Response(agentGuide(true), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
