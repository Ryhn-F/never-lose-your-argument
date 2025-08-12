/**
 * Fallacy types and example texts constants
 */

export interface FallacyType {
  name: string;
  description: string;
}

export const FALLACY_TYPES: FallacyType[] = [
  {
    name: "Ad Hominem",
    description:
      "Menyerang karakter atau sifat pribadi lawan bicara, bukan argumennya.",
  },
  {
    name: "Appeal to Authority",
    description:
      "Menyatakan sesuatu benar hanya karena seseorang dengan otoritas atau status mengatakan demikian.",
  },
  {
    name: "Bandwagon Fallacy",
    description:
      "Berasumsi sesuatu benar karena banyak orang percaya itu benar.",
  },
  {
    name: "False Dichotomy",
    description:
      "Menyajikan hanya dua opsi atau pandangan, ketika sebenarnya ada lebih banyak alternatif.",
  },
  {
    name: "Slippery Slope",
    description:
      "Berasumsi bahwa satu peristiwa kecil akan memicu rangkaian peristiwa yang lebih besar tanpa bukti yang memadai.",
  },
  {
    name: "Strawman Argument",
    description:
      "Mengubah atau melebih-lebihkan argumen lawan untuk membuatnya lebih mudah untuk diserang.",
  },
];

export const EXAMPLE_TEXTS = [
  "Jangan percaya pada apa yang dia katakan, dia kan mantan kriminal! Semua yang dia ucapkan pasti bohong.",
  "Lebih baik kamu percaya pada saya karena saya lulusan universitas ternama.",
  "Semua orang di kantor juga tidak menyukainya, jadi pasti dia yang salah.",
  "Kita harus menolak kebijakan ini, karena jika tidak, kita akan terus menerus menerima kebijakan buruk lainnya.",
];

export const FALLACY_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FF9F1C",
  "#A78BFA",
  "#34D399",
  "#F87171",
];
