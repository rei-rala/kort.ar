"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/shared";

import { LandingMain } from "./landingHeaderMain/landingHeaderMain";

export const LandingHeader = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [isMainInView, setIsMainInView] = useState(true);

  useEffect(() => {
    let elementRefCurrent = mainRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (elementRefCurrent) {
      observer.observe(elementRefCurrent);
    }

    return () => {
      if (elementRefCurrent) {
        observer.unobserve(elementRefCurrent);
      }
    };
  }, [mainRef]);

  return (
    <header style={{ width: "100svw" }}>
      <Navbar hidden={isMainInView} fixed />
      <LandingMain ref={mainRef} isNavbarVisible={isMainInView} />
    </header>
  );
};
