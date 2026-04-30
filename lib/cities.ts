export type AppLocale = "ko" | "en";

export type City = {
  nameKo: string;
  nameEn: string;
  latitude: number;
  longitude: number;
};

export const KOREAN_CITIES: City[] = [
  { nameKo: "서울", nameEn: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { nameKo: "부산", nameEn: "Busan", latitude: 35.1796, longitude: 129.0756 },
  { nameKo: "인천", nameEn: "Incheon", latitude: 37.4563, longitude: 126.7052 },
  { nameKo: "대구", nameEn: "Daegu", latitude: 35.8714, longitude: 128.6014 },
  { nameKo: "대전", nameEn: "Daejeon", latitude: 36.3504, longitude: 127.3845 },
  { nameKo: "광주", nameEn: "Gwangju", latitude: 35.1595, longitude: 126.8526 },
  { nameKo: "울산", nameEn: "Ulsan", latitude: 35.5384, longitude: 129.3114 },
  { nameKo: "제주", nameEn: "Jeju", latitude: 33.4996, longitude: 126.5312 },
];

export function getCityLabel(city: City, locale: AppLocale) {
  return locale === "en" ? city.nameEn : city.nameKo;
}
