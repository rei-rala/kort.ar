"use client";

import React, { useState, useEffect, useMemo } from "react";

const Breakpoint = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};

export const BrowserContext = React.createContext({});

export const BrowserContextProvider: DefaultComponent = ({ children }) => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [currentBreakpoint, setCurrentBreakpoint] = useState<number>(Breakpoint.SM);

  const values = useMemo(
    () => ({ isDarkThemed, width, height, currentBreakpoint }),
    [isDarkThemed, width, height, currentBreakpoint]
  );

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
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width >= Breakpoint.XL) return setCurrentBreakpoint(Breakpoint.XL);
    if (width >= Breakpoint.LG) return setCurrentBreakpoint(Breakpoint.LG);
    if (width >= Breakpoint.MD) return setCurrentBreakpoint(Breakpoint.MD);
    if (width >= Breakpoint.SM) return setCurrentBreakpoint(Breakpoint.SM);

    return setCurrentBreakpoint(Breakpoint.XS);
  }, [width]);

  return <BrowserContext.Provider value={values}>{children}</BrowserContext.Provider>;
};
