"use client";

import React, { useState, useEffect, useMemo } from "react";

export const BrowserContext = React.createContext({});

export const BrowserContextProvider: DefaultComponent = ({ children }) => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(Breakpoint.SM);

  useEffect(() => {
    if (!window || !window.matchMedia) {
      return;
    }

    function handleColorSchemeChange() {
      const mediaQuery = "(prefers-color-scheme: dark)";
      const currentlyDark = window.matchMedia(mediaQuery).matches;
      setIsDarkThemed(currentlyDark);
    }

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", handleColorSchemeChange);

    handleColorSchemeChange();

    return () => colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 600) return setCurrentBreakpoint(Breakpoint.XS);
    if (width < 960) return setCurrentBreakpoint(Breakpoint.SM);
    if (width < 1280) return setCurrentBreakpoint(Breakpoint.MD);
    if (width < 1920) return setCurrentBreakpoint(Breakpoint.LG);

    return setCurrentBreakpoint(Breakpoint.XL);
  }, [width]);

  const values = useMemo(
    () => ({ isDarkThemed, width, height, currentBreakpoint }),
    [isDarkThemed, width, height, currentBreakpoint]
  );

  return <BrowserContext.Provider value={values}>{children}</BrowserContext.Provider>;
};
