"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Autocomplete,
  TextField,
  IconButton,
  Paper,
  Stack,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import LocationSearching from "@mui/icons-material/LocationSearching";
import ModeToggle from "@/components/ModeToggle";
import OpenMeteoMark from "@/components/OpenMeteoMark";
import ForecastCard from "@/components/ForecastCard";
import IntlProvider, { useLocale, useLocaleSettings, useTranslations } from "@/components/IntlProvider";
import useSWR from "swr";
import { KOREAN_CITIES, getCityLabel, type AppLocale, type City } from "@/lib/cities";

type ApiDay = { date: string; tmin: number; tmax: number; precipProb: number };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function WeatherDashboard() {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const { setLocale } = useLocaleSettings();
  const [city, setCity] = React.useState<City>(KOREAN_CITIES[0]);
  const [days, setDays] = React.useState(7);
  const [pending, setPending] = React.useState(false);

  const params = new URLSearchParams({
    lat: String(city.latitude),
    lon: String(city.longitude),
    days: String(days),
  });

  const { data, isLoading, isValidating } = useSWR<{ days: ApiDay[] }>(
    `/api/forecast?${params.toString()}`,
    fetcher
  );

  React.useEffect(() => {
    if (!isLoading && !isValidating) {
      setPending(false);
    }
  }, [isLoading, isValidating]);

  const geolocate = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPending(true);
      setCity({
        nameKo: t("currentLocation"),
        nameEn: t("currentLocation"),
        latitude,
        longitude,
      });
    });
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value as AppLocale);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={(theme) => ({
          position: { xs: "sticky", sm: "fixed" },
          top: { xs: "env(safe-area-inset-top)", sm: 0 },
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: theme.palette.background.paper,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "saturate(180%) blur(8px)",
        })}
      >
        <Toolbar
          sx={{
            gap: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            alignItems: "center",
            px: { xs: 1.5, sm: 3 },
            py: { xs: 1, sm: 0.75 },
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 0 100%", sm: 1 },
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="img"
              src="/open-meteo.svg"
              alt="Open-Meteo"
              sx={{ width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, display: "block", flexShrink: 0 }}
            />
            <Typography variant="h6" sx={{ lineHeight: 1.1, fontSize: { xs: "1.05rem", sm: "1.25rem" } }}>
              {t("appTitle")}
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr) minmax(0, 1fr)", sm: "140px 90px 140px auto auto" },
              gap: { xs: 1, sm: 2 },
              alignItems: "center",
            }}
          >
            <Autocomplete
              sx={{ gridColumn: { xs: "1 / -1", sm: "auto" }, minWidth: 0 }}
              options={KOREAN_CITIES}
              value={city}
              isOptionEqualToValue={(option, value) =>
                option.latitude === value.latitude && option.longitude === value.longitude
              }
              onChange={(_, value) => {
                if (value) {
                  setPending(true);
                  setCity(value);
                }
              }}
              getOptionLabel={(option) => getCityLabel(option, locale)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label={t("region")}
                  placeholder={t("cityPlaceholder")}
                />
              )}
            />

            <FormControl size="small" sx={{ minWidth: 0 }}>
              <InputLabel id="period-select-label">{t("period")}</InputLabel>
              <Select
                labelId="period-select-label"
                value={String(days)}
                label={t("period")}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <MenuItem value="7">{t("days7")}</MenuItem>
                <MenuItem value="16">{t("days16")}</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 0 }}>
              <InputLabel id="language-select-label">{t("language")}</InputLabel>
              <Select
                labelId="language-select-label"
                value={locale}
                label={t("language")}
                onChange={handleLanguageChange}
              >
                <MenuItem value="ko">{"\uD55C\uAD6D\uC5B4"}</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "center" } }}>
              <IconButton onClick={geolocate} aria-label={t("currentLocation")}>
                <LocationSearching />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: { xs: "flex-end", sm: "flex-start" }, minWidth: 0 }}>
              <ModeToggle />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ display: { xs: "none", sm: "block" } }} />

      <Container className="container" sx={{ mt: { xs: 1, sm: 1 } }}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            useFlexGap
            spacing={2}
          >
            <Typography variant="h5" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" }, minWidth: 0 }}>
              {getCityLabel(city, locale)} {days}
              {t("forecastSuffix")}
            </Typography>
            <Box sx={{ ml: { xs: 0, sm: "auto" }, display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="a"
                href="https://open-meteo.com"
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <OpenMeteoMark size={18} />
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  {t("poweredBy")}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {data?.days?.map((day, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <ForecastCard
                  date={day.date}
                  tmin={day.tmin}
                  tmax={day.tmax}
                  precipProb={day.precipProb}
                />
              </Grid>
            ))}
          </Grid>
          {(!data || pending) && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
              <Box component="img" src="/wait-circle.gif" alt="Loading..." sx={{ width: 20, height: 20 }} />
              <Typography variant="body2">{t("loadingForecast")}</Typography>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default function Page() {
  return (
    <IntlProvider>
      <WeatherDashboard />
    </IntlProvider>
  );
}
