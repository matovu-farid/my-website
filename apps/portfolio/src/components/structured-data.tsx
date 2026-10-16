import { serializeJsonLd } from "@/lib/seo";

export default function StructuredData({ data }: { data: unknown }) {
  return <script id="portfolio-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
