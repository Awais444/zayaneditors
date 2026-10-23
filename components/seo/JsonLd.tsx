export function JsonLd({ data }: { data: object | object[] }) {
  if (Array.isArray(data) && !data.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
