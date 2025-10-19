import { NextRequest } from "next/server";
export const revalidate = 1800;
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat")||"37.5665");
  const lon = parseFloat(searchParams.get("lon")||"126.9780");
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_probability_mean");
  url.searchParams.set("timezone", "Asia/Seoul");
  const requestDays = Math.max(1, Math.min(16, parseInt(searchParams.get("days")||"7", 10)));
  url.searchParams.set("forecast_days", String(requestDays));
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return new Response(JSON.stringify({ error: "upstream error"}), { status: res.status });
  const data = await res.json();
  const rows = (data.daily.time as string[]).map((date: string, i: number)=> ({
    date,
    tmin: data.daily.temperature_2m_min[i],
    tmax: data.daily.temperature_2m_max[i],
    precipProb: data.daily.precipitation_probability_mean?.[i] ?? 0
  }));
  return Response.json({ days: rows });
}
