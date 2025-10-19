export type Day = { date: string; tmin: number; tmax: number; precipProb: number };
export function umbrellaAdvice(precipProb: number){ if (precipProb>=60) return "우산 필수"; if (precipProb>=40) return "우산 권장"; if (precipProb>=25) return "우비/모자 고려"; return "우산 불필요"; }
export function clothingAdvice(tmin:number,tmax:number){
  if (tmax>=27) return "반팔/얇은 하의 (아침엔 얇은 겉옷)";
  if (tmax>=23) return "반팔+가벼운 겉옷 또는 얇은 긴팔";
  if (tmax>=18) return "긴팔 셔츠/가벼운 가디건";
  if (tmax>=12) return "얇은 코트/자켓 + 긴팔";
  if (tmax>=5)  return "두꺼운 자켓/니트, 필요 시 머플러";
  return "두꺼운 코트/패딩, 보온 내복 권장";
}
export function comfortBadge(tmin:number,tmax:number){ const r=tmax-tmin; if (tmax>=27) return "더움"; if (tmax<=5) return "추움"; if (r>=12) return "일교차 큼"; return "보통"; }
