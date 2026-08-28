import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <p>© {new Date().getFullYear()} Farid Matovu. Products, platforms, and the systems between them.</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/projects">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
