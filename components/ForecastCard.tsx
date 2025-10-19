"use client";
import * as React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import UmbrellaOutlined from "@mui/icons-material/UmbrellaOutlined";
import Thermostat from "@mui/icons-material/Thermostat";
import { umbrellaAdvice, clothingAdvice, comfortBadge } from "@/lib/recommendation";
export default function ForecastCard({date, tmin, tmax, precipProb}:{date:string; tmin:number; tmax:number; precipProb:number}){
  const ua = umbrellaAdvice(precipProb); const ca = clothingAdvice(tmin, tmax); const badge = comfortBadge(tmin, tmax);
  return (<Card variant="outlined" sx={{height:"100%"}}><CardContent>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{new Date(date).toLocaleDateString("ko-KR",{weekday:"short", month:"numeric", day:"numeric"})}</Typography>
      <Chip label={badge} size="small"/>
    </Stack>
    <Stack direction="row" spacing={2} mt={1} alignItems="center"><Thermostat/><Typography variant="body1">최저 {Math.round(tmin)}° / 최고 {Math.round(tmax)}°</Typography></Stack>
    <Stack direction="row" spacing={2} mt={1} alignItems="center"><UmbrellaOutlined/><Typography variant="body1">강수확률 {Math.round(precipProb)}%</Typography></Stack>
    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap><Chip label={ua} color={precipProb>=40?"primary":"default"} variant={precipProb>=60?"filled":"outlined"}/><Chip label={ca}/></Stack>
  </CardContent></Card>);
}
