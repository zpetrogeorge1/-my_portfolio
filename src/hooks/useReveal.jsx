import { useState, useEffect, useRef } from "react";

/** Fires once when the element scrolls into view. */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/** Wraps children in a fade-up reveal animation on scroll. */
export function Reveal({ children, delay = 0, y = 18 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.55s cubic-bezier(.4,0,.2,1) ${delay}s,
                     transform 0.55s cubic-bezier(.4,0,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
