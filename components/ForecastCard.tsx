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
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {new Date(date).toLocaleDateString(dateLocale, {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            })}
          </Typography>
          <Chip label={badge} size="small" />
        </Stack>
        <Stack direction="row" spacing={2} mt={1} alignItems="center">
          <Thermostat />
          <Typography variant="body1">
            {t("minTemp")} {Math.round(tmin)}° / {t("maxTemp")} {Math.round(tmax)}°
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} mt={1} alignItems="center">
          <UmbrellaOutlined />
          <Typography variant="body1">
            {t("precipProbability")} {Math.round(precipProb)}%
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
          <Chip
            label={umbrella}
            color={precipProb >= 40 ? "primary" : "default"}
            variant={precipProb >= 60 ? "filled" : "outlined"}
          />
          <Chip label={clothing} />
        </Stack>
      </CardContent>
    </Card>
  );
}
