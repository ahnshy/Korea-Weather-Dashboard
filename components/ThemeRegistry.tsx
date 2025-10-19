"use client";
import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
type AppMode = "light" | "dark" | "night";
type ThemeContextType = { appMode: AppMode; setAppMode: (m: AppMode)=>void };
export const ThemeCtx = React.createContext<ThemeContextType>({appMode: "dark", setAppMode: ()=>{}});
function makeTheme(mode: AppMode){
  const paletteMode: PaletteMode = mode === "light" ? "light" : "dark";
  const isNight = mode === "night";
  return createTheme({
    palette: { mode: paletteMode, ...(isNight ? { background:{default:"#0b1020", paper:"#121833"}, text:{primary:"#e8ebff"} } : {}) },
    shape:{ borderRadius:14 },
    typography:{ fontFamily: "Pretendard, Noto Sans KR, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
    components:{ MuiAppBar:{ styleOverrides:{ root:{ borderRadius:0, marginTop:0 }}}}
  });
}
export default function ThemeRegistry({children}:{children: React.ReactNode}){
  const [appMode, setAppMode] = React.useState<AppMode>(()=>{
    if (typeof window !== "undefined") return (localStorage.getItem("appMode") as AppMode) || "dark";
    return "dark";
  });
  React.useEffect(()=>{ localStorage.setItem("appMode", appMode); }, [appMode]);
  const theme = React.useMemo(()=>makeTheme(appMode), [appMode]);
  return <ThemeCtx.Provider value={{appMode,setAppMode}}><ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider></ThemeCtx.Provider>;
}
