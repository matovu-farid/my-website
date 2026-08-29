"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-shell site-header-inner" aria-label="Primary navigation">
        <Link href="/" className="brand-lockup" aria-label="Fidexa studio home">
          <Image className="brand-mark" src="/fidexa-app-icon.svg" alt="" width={32} height={32} priority />
          <span><span>Fidexa</span><span className="brand-meta">Farid Matovu · Software studio</span></span>
        </Link>
        <ul className="header-nav">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link href={href} aria-current={isActive ? "page" : undefined}>{label}</Link>
              </li>
            );
          })}
        </ul>
        <span className="header-availability"><span className="status-dot" aria-hidden="true" /> Available for selected work</span>
      </nav>
    </header>
  );
}
