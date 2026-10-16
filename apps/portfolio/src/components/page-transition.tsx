// Keep meaningful content visible in the initial HTML, even without JavaScript.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
