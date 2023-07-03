"use client"
import React, { useState, useEffect } from 'react';

export const BrowserContext = React.createContext({});

export const BrowserContextProvider = ({ children }: { children: any }) => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoints>('sm');


  useEffect(() => {
    if (!window || !window.matchMedia) {
      return;
    }

    function handleColorSchemeChange() {
      let currentlyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkThemed(currentlyDark);
    }

    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);

    handleColorSchemeChange();

    return () => colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (width < 600)
      return setCurrentBreakpoint('xs');
    if (width < 960)
      return setCurrentBreakpoint('sm');
    if (width < 1280)
      return setCurrentBreakpoint('md');
    if (width < 1920)
      return setCurrentBreakpoint('lg');

    return setCurrentBreakpoint('xl');
  }, [width]);


  return (
    <BrowserContext.Provider value={{ isDarkThemed, width, height, currentBreakpoint }}>
      {children}
    </BrowserContext.Provider>
  );
}
