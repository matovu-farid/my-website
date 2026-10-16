import Content from "./experience-content";
import StructuredData from "@/components/structured-data";
import { site } from "@/data/site";
import { pageMetadata, pageStructuredData } from "@/lib/seo";

export const metadata = pageMetadata(site.pages.experience);

export default function Page() {
  return <><StructuredData data={pageStructuredData(site.pages.experience, "AboutPage")} /><Content /></>;
}
