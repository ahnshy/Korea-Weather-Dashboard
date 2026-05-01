export type AppLocale = "ko" | "en";

export type City = {
  nameKo: string;
  nameEn: string;
  latitude: number;
  longitude: number;
};

export const KOREAN_CITIES: City[] = [
  { nameKo: "\uC11C\uC6B8", nameEn: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { nameKo: "\uBD80\uC0B0", nameEn: "Busan", latitude: 35.1796, longitude: 129.0756 },
  { nameKo: "\uC778\uCC9C", nameEn: "Incheon", latitude: 37.4563, longitude: 126.7052 },
  { nameKo: "\uB300\uAD6C", nameEn: "Daegu", latitude: 35.8714, longitude: 128.6014 },
  { nameKo: "\uB300\uC804", nameEn: "Daejeon", latitude: 36.3504, longitude: 127.3845 },
  { nameKo: "\uAD11\uC8FC", nameEn: "Gwangju", latitude: 35.1595, longitude: 126.8526 },
  { nameKo: "\uC6B8\uC0B0", nameEn: "Ulsan", latitude: 35.5384, longitude: 129.3114 },
  { nameKo: "\uC81C\uC8FC", nameEn: "Jeju", latitude: 33.4996, longitude: 126.5312 }
];

export function getCityLabel(city: City, locale: AppLocale) {
  return locale === "en" ? city.nameEn : city.nameKo;
}
