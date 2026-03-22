"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("visible");
            }, i * 70);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return null;
}
