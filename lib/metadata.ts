import type { Metadata } from "next";
import { site } from "@/data/site";

/** Builds per-route metadata with canonical, OG and Twitter tags. */
export const pageMeta = ({ title, description, path }: { title: string; description: string; path: string }): Metadata => ({
  title: { absolute: title },
  description: description.slice(0, 155),
  alternates: { canonical: path },
  openGraph: { title, description, url: path, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
});
