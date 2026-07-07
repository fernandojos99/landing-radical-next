'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export function CountUp({ value }: { value: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [display, setDisplay] = useState(value ?? '');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated?.current) return;
    const safeValue = value ?? '';
    const numericMatch = safeValue?.match?.(/^(\d+)/);
    if (numericMatch) {
      const target = parseInt(numericMatch[1] ?? '0', 10);
      const rest = safeValue?.slice?.(numericMatch[0]?.length ?? 0) ?? '';
      let current = 0;
      const duration = 1500;
      const step = Math.max(1, Math.floor(target / (duration / 16)));
      hasAnimated.current = true;

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setDisplay(`${current}${rest}`);
      }, 16);

      return () => clearInterval(interval);
    } else {
      setDisplay(safeValue);
    }
  }, [inView, value]);

  return <span ref={ref}>{display ?? ''}</span>;
}
