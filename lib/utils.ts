import { site } from "@/data/site";

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const formatMoney = (usd: number, rate = 1, symbol = "$") =>
  `${symbol}${Math.round(usd * rate).toLocaleString("en-US")}`;

export const absoluteUrl = (path = "/") => {
  return `${site.url}${path === "/" ? "" : path}`;
};
