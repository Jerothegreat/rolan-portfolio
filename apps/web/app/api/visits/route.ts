// Site-wide visit counter (one number in Upstash Redis). No IPs, cookies, or visitor data are
// stored. Until UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set it answers
// { count: null } and the ticker leaves the counter out.
const KEY = "visits";

async function redis(command: "incr" | "get") {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/${command}/${KEY}`, {
    method: command === "incr" ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const { result } = (await res.json()) as { result: number | string | null };
  return Number(result ?? 0);
}

export async function GET() {
  return Response.json({ count: await redis("get") });
}

// Counts a new visit. Only same-origin page loads may count.
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return new Response(null, { status: 403 });
  return Response.json({ count: await redis("incr") });
}
