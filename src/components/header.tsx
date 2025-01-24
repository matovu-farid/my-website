"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-80">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} passHref>
                <motion.span
                  className={`text-lg font-medium ${
                    pathname === href ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                  } hover:text-gray-900 dark:hover:text-white transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

