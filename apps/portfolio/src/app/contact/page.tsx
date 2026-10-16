import Content from "./contact-content";
import StructuredData from "@/components/structured-data";
import { site } from "@/data/site";
import { pageMetadata, pageStructuredData } from "@/lib/seo";

export const metadata = pageMetadata(site.pages.contact);

export default function Page() {
  return <><StructuredData data={pageStructuredData(site.pages.contact, "ContactPage")} /><Content /></>;
}
