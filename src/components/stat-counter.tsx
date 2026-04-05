"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ end, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-foreground">
        {count}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
