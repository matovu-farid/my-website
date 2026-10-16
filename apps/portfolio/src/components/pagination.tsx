import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { catalogHref, type CatalogSelection } from "@/lib/catalog";

export default function Pagination({ selection, totalPages }: { selection: CatalogSelection; totalPages: number }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Project pages">
      {selection.page > 1 ? <Link href={catalogHref({ ...selection, page: selection.page - 1 })} aria-label="Previous page"><ChevronLeft size={20} aria-hidden="true" /></Link> : <span aria-hidden="true"><ChevronLeft size={20} /></span>}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Link key={page} href={catalogHref({ ...selection, page })} aria-label={`Page ${page}`} aria-current={selection.page === page ? "page" : undefined} data-current={selection.page === page}>{page}</Link>
      ))}
      {selection.page < totalPages ? <Link href={catalogHref({ ...selection, page: selection.page + 1 })} aria-label="Next page"><ChevronRight size={20} aria-hidden="true" /></Link> : <span aria-hidden="true"><ChevronRight size={20} /></span>}
    </nav>
  );
}
