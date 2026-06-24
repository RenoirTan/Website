export type CardColorTheme = "default" | "liver" | "ocean" | "gold" | "violet" | "nature";

export const CARD_COLORTHEME_CLASSNAME = {
  "default": "bg-linear-to-br from-l-calm-gray to-l-black",
  "liver": "bg-linear-to-br from-purple-800 to-orange-950",
  "ocean": "bg-linear-to-br from-cyan-800 to-emerald-950",
  "gold": "bg-linear-to-br from-yellow-800 to-red-950",
  "violet": "bg-linear-to-br from-cyan-800 to-purple-950",
  "nature": "bg-linear-to-br from-lime-800 to-teal-950",
}

export function getColorTheme(name?: CardColorTheme): string {
  return CARD_COLORTHEME_CLASSNAME[name ?? "default"]
  ?? CARD_COLORTHEME_CLASSNAME.default;
}