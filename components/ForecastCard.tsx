"use client";

import * as React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import UmbrellaOutlined from "@mui/icons-material/UmbrellaOutlined";
import Thermostat from "@mui/icons-material/Thermostat";
import type { AppLocale } from "@/lib/cities";
import { useLocale, useTranslations } from "@/components/IntlProvider";
import { umbrellaAdvice, clothingAdvice, comfortBadge } from "@/lib/recommendation";

export default function ForecastCard({
  date,
  tmin,
  tmax,
  precipProb,
}: {
  date: string;
  tmin: number;
  tmax: number;
  precipProb: number;
}) {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const dateLocale = locale === "en" ? "en-US" : "ko-KR";
  const umbrella = umbrellaAdvice(precipProb, locale);
  const clothing = clothingAdvice(tmin, tmax, locale);
  const badge = comfortBadge(tmin, tmax, locale);

  return (
    <Card variant="outlined" sx={{ height: "100%", minWidth: 0 }}>
      <CardContent sx={{ p: { xs: 1.75, sm: 2 }, "&:last-child": { pb: { xs: 1.75, sm: 2 } } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6" sx={{ minWidth: 0, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            {new Date(date).toLocaleDateString(dateLocale, {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            })}
          </Typography>
          <Chip label={badge} size="small" sx={{ flexShrink: 0 }} />
        </Stack>
        <Stack direction="row" spacing={1.25} mt={1} alignItems="center">
          <Thermostat fontSize="small" sx={{ flexShrink: 0 }} />
          <Typography variant="body1" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
            {t("minTemp")} {Math.round(tmin)}° / {t("maxTemp")} {Math.round(tmax)}°
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25} mt={1} alignItems="center">
          <UmbrellaOutlined fontSize="small" sx={{ flexShrink: 0 }} />
          <Typography variant="body1" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
            {t("precipProbability")} {Math.round(precipProb)}%
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
          <Chip
            label={umbrella}
            color={precipProb >= 40 ? "primary" : "default"}
            variant={precipProb >= 60 ? "filled" : "outlined"}
            size="small"
            sx={{ maxWidth: "100%" }}
          />
          <Chip label={clothing} size="small" sx={{ maxWidth: "100%" }} />
        </Stack>
      </CardContent>
    </Card>
  );
}
