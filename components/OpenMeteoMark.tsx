"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";

function hexToRgb(hex: string){
  const m = hex.replace("#","");
  const s = m.length===3 ? m.split("").map(c=>c+c).join("") : m;
  const bigint = parseInt(s, 16);
  return { r: (bigint>>16)&255, g: (bigint>>8)&255, b: bigint&255 };
}
function luminance(hex: string){
  const {r,g,b} = hexToRgb(hex);
  const srgb = [r,g,b].map(v=>{
    const c = v/255;
    return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}
function pickHighContrast(bg: string){
  // prefer theme contrast (black/white), else fallback by luminance
  try {
    // bg is hex like #121212
    const L = luminance(bg);
    return L > 0.5 ? "#000000" : "#FFFFFF";
  } catch { return "#FFFFFF"; }
}

/** Open‑Meteo style mark (cloud + small sun with 3 rays), theme-aware high-contrast color */
export default function OpenMeteoMark({size=20}:{size?:number}){
  const theme = useTheme() as any;
  const bg = (theme.palette?.background?.paper) || (theme.palette?.background?.default) || "#121212";
  const contrast = (theme.palette?.getContrastText?.(bg)) || pickHighContrast(bg);
  const halo = bg; // halo uses background color
  const sw = Math.max(1.8, Math.round(size/8)); // stroke width scales with size
  const haloW = sw + 2; // slightly bigger

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Open-Meteo">
      {/* HALO strokes to ensure visibility on any background */}
      <g transform="translate(0,0)" stroke={halo} strokeWidth={haloW} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
        {/* Sun */}
        <circle cx="22" cy="22" r="6" />
        <line x1="22" y1="10" x2="22" y2="6" />
        <line x1="14" y1="18" x2="10" y2="14" />
        <line x1="30" y1="18" x2="34" y2="14" />
        {/* Cloud */}
        <path d="M18 44 c0-6 5-11 11-11 c2.5 0 4.8 0.8 6.7 2.1 c1.8-4.1 5.9-7 10.6-7 c6.5 0 11.7 5.2 11.7 11.7 v0 c4.6 0.5 8.1 4.3 8.1 9 s-3.9 9-8.6 9 H26 c-4.8 0-8.6-3.9-8.6-9 z"/>
      </g>
      {/* Foreground strokes/fills */}
      <g transform="translate(0,0)" stroke={contrast} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Sun */}
        <circle cx="22" cy="22" r="6" fill={contrast} opacity="0.25"/>
        <line x1="22" y1="10" x2="22" y2="6" />
        <line x1="14" y1="18" x2="10" y2="14" />
        <line x1="30" y1="18" x2="34" y2="14" />
        {/* Cloud */}
        <path d="M18 44 c0-6 5-11 11-11 c2.5 0 4.8 0.8 6.7 2.1 c1.8-4.1 5.9-7 10.6-7 c6.5 0 11.7 5.2 11.7 11.7 v0 c4.6 0.5 8.1 4.3 8.1 9 s-3.9 9-8.6 9 H26 c-4.8 0-8.6-3.9-8.6-9 z"/>
      </g>
    </svg>
  );
}
