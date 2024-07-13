"use client";

import React, { useState, useEffect } from "react";

export const useBrowser = () => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const scroll = {
    x: scrollX,
    y: scrollY,
  };

  const scrollPercentage = {
    x: Math.max(0, scrollX / (document.documentElement.scrollWidth - window.innerWidth)),
    y: Math.max(0, scrollY / (document.documentElement.scrollHeight - window.innerHeight)),
  };

  useEffect(() => {
    let colorSchemeQuery: MediaQueryList;

    function handleColorSchemeChange() {
      const mediaQuery = "(prefers-color-scheme: dark)";
      const currentlyDark = window.matchMedia(mediaQuery).matches;
      setIsDarkThemed(currentlyDark);
    }

    if (window && window.matchMedia) {
      colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
      handleColorSchemeChange();
    }

    return () => colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isDarkThemed, scrollPercentage, scroll };
};
