import type { AppLocale } from "@/lib/cities";

export type Day = { date: string; tmin: number; tmax: number; precipProb: number };

export function umbrellaAdvice(precipProb: number, locale: AppLocale) {
  if (precipProb >= 60) return locale === "en" ? "Umbrella needed" : "\uC6B0\uC0B0 \uD544\uC218";
  if (precipProb >= 40) return locale === "en" ? "Umbrella recommended" : "\uC6B0\uC0B0 \uAD8C\uC7A5";
  if (precipProb >= 25) {
    return locale === "en" ? "Consider rain gear" : "\uC6B0\uBE44/\uBAA8\uC790 \uACE0\uB824";
  }

  return locale === "en" ? "No umbrella needed" : "\uC6B0\uC0B0 \uBD88\uD544\uC694";
}

export function clothingAdvice(_tmin: number, tmax: number, locale: AppLocale) {
  if (tmax >= 27) {
    return locale === "en"
      ? "Short sleeves and light bottoms"
      : "\uBC18\uD314/\uBBFC\uC18C\uB9E4, \uAC00\uBCBC\uC6B4 \uD558\uC758";
  }

  if (tmax >= 23) {
    return locale === "en"
      ? "Light top with a thin outer layer"
      : "\uBC18\uD314+\uAC00\uBCBC\uC6B4 \uAC89\uC637 \uB610\uB294 \uC587\uC740 \uAE34\uD314";
  }

  if (tmax >= 18) {
    return locale === "en"
      ? "Long sleeves or a light jacket"
      : "\uAE34\uD314 \uD2F0\uC154\uCE20/\uAC00\uBCBC\uC6B4 \uAC00\uB514\uAC74";
  }

  if (tmax >= 12) {
    return locale === "en"
      ? "Jacket or cardigan"
      : "\uC790\uCF13, \uCF54\uD2B8/\uAC00\uB514\uAC74 + \uAE34\uD314";
  }

  if (tmax >= 5) {
    return locale === "en"
      ? "Coat or knitwear"
      : "\uB2C8\uD2B8/\uC790\uCF13/\uCF54\uD2B8, \uB808\uC774\uC5B4\uB4DC \uCD94\uCC9C";
  }

  return locale === "en"
    ? "Heavy coat and winter layers"
    : "\uB450\uAEBC\uC6B4 \uCF54\uD2B8/\uD328\uB529, \uBCF4\uC628 \uC758\uB958 \uAD8C\uC7A5";
}

export function comfortBadge(tmin: number, tmax: number, locale: AppLocale) {
  const range = tmax - tmin;

  if (tmax >= 27) return locale === "en" ? "Hot" : "\uB354\uC6C0";
  if (tmax <= 5) return locale === "en" ? "Cold" : "\uCD94\uC6C0";
  if (range >= 12) return locale === "en" ? "Big swing" : "\uC77C\uAD50\uCC28 \uD07C";
  return locale === "en" ? "Mild" : "\uBCF4\uD1B5";
}
