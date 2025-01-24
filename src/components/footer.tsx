export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </footer>
  )
}

