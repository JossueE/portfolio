import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function youtubeThumb(id: string, quality: "hq" | "mq" | "max" = "hq") {
  const suffix =
    quality === "max" ? "maxresdefault" : quality === "mq" ? "mqdefault" : "hqdefault";
  return `https://img.youtube.com/vi/${id}/${suffix}.jpg`;
}

export function youtubeEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}`;
}
