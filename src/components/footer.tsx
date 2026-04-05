export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Farid Matovu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
