import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

export default function Counter({
  value,
  direction = "up",
  prefix = "",
  className,
  duration = 2.5, 
}: {
  value: number;
  direction?: "up" | "down";
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const start = direction === "down" ? value : 0;
      const end = direction === "down" ? 0 : value;

      const controls = animate(start, end, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = prefix + latest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, direction, prefix, duration]);

  return <span className={className} ref={ref} />;
}
