"use client";
import * as React from "react";
import { AppBar, Toolbar, Typography, Box, Container, Grid, Autocomplete, TextField, IconButton, Paper, Stack, Divider, Select, MenuItem, FormControl } from "@mui/material";
import LocationSearching from "@mui/icons-material/LocationSearching";
import ModeToggle from "@/components/ModeToggle";
import OpenMeteoMark from "@/components/OpenMeteoMark";
import ForecastCard from "@/components/ForecastCard";
import useSWR from "swr";
import { KOREAN_CITIES } from "@/lib/cities";

type ApiDay = { date: string; tmin: number; tmax: number; precipProb: number };
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function Page(){
  const [city, setCity] = React.useState(KOREAN_CITIES[0]);
  const [days, setDays] = React.useState(7);
  const params = new URLSearchParams({ lat: String(city.latitude), lon: String(city.longitude), days: String(days) });
  const { data, isLoading, isValidating } = useSWR<{days: ApiDay[]}>(`/api/forecast?${params.toString()}`, fetcher);
  const [pending, setPending] = React.useState(false);
  React.useEffect(()=>{ if (!isLoading && !isValidating) setPending(false); }, [isLoading, isValidating]);

  const geolocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos=>{
      const { latitude, longitude } = pos.coords;
      setPending(true); setCity({ name: "현재 위치", latitude, longitude });
    });
  };

  return (
    <Box>
      <AppBar position="fixed" color="transparent" elevation={0} sx={(t)=>({ zIndex: t.zIndex.drawer+1, bgcolor: t.palette.background.paper, borderBottom: `1px solid ${"rgba(255,255,255,0.08)"}`, backdropFilter: "saturate(180%) blur(8px)" })}>
        <Toolbar sx={{gap:2, flexWrap:"wrap", alignItems:"center"}}>
          <Typography variant="h6" sx={{flex:1, minWidth:160}}>한국날씨</Typography>
          <Autocomplete sx={{width: 280}} options={KOREAN_CITIES} value={city} onChange={(_,v)=>{ if(v){ setPending(true); setCity(v);} }} getOptionLabel={(c)=>c.name} renderInput={(params)=>(<TextField {...params} size="small" placeholder="도시 선택"/>)}/>
          <FormControl size="small" sx={{ minWidth: 90 }}>
            <Select value={days} onChange={(e)=>setDays(Number(e.target.value))} displayEmpty>
              <MenuItem value={7}>7일</MenuItem>
              <MenuItem value={16}>16일 (최대)</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={geolocate} aria-label="현재 위치"><LocationSearching/></IconButton>
          <ModeToggle/>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container className="container" sx={{mt:1}}>
        <Paper variant="outlined" sx={{p:2, mb:2}}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" useFlexGap spacing={2}>
            <Typography variant="h5">{city.name} {days}일 예보</Typography>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
              <Box component="a" href="https://open-meteo.com" target="_blank" rel="noreferrer" sx={{ display: "inline-flex", alignItems: "center", gap: 1, textDecoration: "none", color: "inherit" }}>
                <OpenMeteoMark size={18} />
                <Typography variant="body2" sx={{ opacity: 0.75 }}>Powered by Open-Meteo</Typography>
              </Box>
            </Box>
          </Stack>
          <Divider sx={{my:2}}/>
          <Grid container spacing={2}>
            {data?.days?.map((d, i)=>(
              <Grid key={i} item xs={12} sm={6} md={4}><ForecastCard date={d.date} tmin={d.tmin} tmax={d.tmax} precipProb={d.precipProb}/></Grid>
            ))}
          </Grid>
          {!data && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
              <Box component="img" src="/wait-circle.gif" alt="Loading..." sx={{ width: 20, height: 20 }} />
              <Typography variant="body2">예보 불러오는 중.....</Typography>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
