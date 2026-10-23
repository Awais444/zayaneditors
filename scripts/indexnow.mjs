// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live sitemap, or with the URLs
// given as arguments. Run after a deploy:  npm run indexnow   (or: npm run indexnow -- /pricing /blog/x)
// The key file public/7af9630efb7cdccb304987c84c790f42.txt must be reachable at https://<domain>/7af9630efb7cdccb304987c84c790f42.txt
const KEY = "7af9630efb7cdccb304987c84c790f42";
const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
if (!site) {
  console.error("indexnow: set NEXT_PUBLIC_SITE_URL to the live domain");
  process.exit(1);
}
let urls = process.argv.slice(2).map((p) => (p.startsWith("http") ? p : site + p));
if (!urls.length) {
  const xml = await (await fetch(site + "/sitemap.xml")).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: site + "/" + KEY + ".txt", urlList: urls }),
});
console.log("indexnow:", res.status, res.statusText, urls.length, "URLs");
