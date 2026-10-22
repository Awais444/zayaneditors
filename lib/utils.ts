export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const formatMoney = (usd: number, rate = 1, symbol = "$") =>
  `${symbol}${Math.round(usd * rate).toLocaleString("en-US")}`;

export const absoluteUrl = (path = "/") => {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
  return `${base}${path === "/" ? "" : path}`;
};
