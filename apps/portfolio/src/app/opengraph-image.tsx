import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Farid Matovu — Senior Full-Stack Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ShareImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#151821", color: "#fffefa", padding: "64px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#68cfbb", fontSize: 28 }}>{site.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>I build systems that ship.</div>
        <div style={{ display: "flex", fontSize: 32, color: "#d0d4de" }}>{site.role}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #4a5060", paddingTop: 24, fontSize: 22, color: "#d0d4de" }}>
        <span>Products · Platforms · Production systems</span><span>Kampala / Remote · GMT+3</span>
      </div>
    </div>, size,
  );
}
