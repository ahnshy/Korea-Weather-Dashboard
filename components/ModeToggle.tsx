"use client";
import * as React from "react";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import NightlightOutlined from "@mui/icons-material/NightlightOutlined";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import { ThemeCtx } from "./ThemeRegistry";
export default function ModeToggle(){
  const { appMode, setAppMode } = React.useContext(ThemeCtx);
  const handle = (_:any, next:string|null)=>{ if (next) setAppMode(next as any); };
  return (
    <Tooltip title="Theme mode">
      <ToggleButtonGroup exclusive size="small" value={appMode} onChange={handle} aria-label="theme mode toggle">
        <ToggleButton value="light" aria-label="light"><WbSunnyOutlined/></ToggleButton>
        <ToggleButton value="dark" aria-label="dark"><DarkModeOutlined/></ToggleButton>
        <ToggleButton value="night" aria-label="night"><NightlightOutlined/></ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  );
}
