"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";

import { LandingMain } from "./landingHeaderMain/landingHeaderMain";

const NavbarLazy = React.lazy(() =>
  import("@/components/shared").then((module) => ({
    default: module.Navbar,
  }))
);

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
      <Suspense>
        <NavbarLazy hidden={isMainInView} fixed />
      </Suspense>
      <LandingMain ref={mainRef} isNavbarVisible={isMainInView} />
    </header>
  );
};
