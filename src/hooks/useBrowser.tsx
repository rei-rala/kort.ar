"use client";

import React, { useState, useEffect } from "react";

export const useBrowser = () => {
  const [isDarkThemed, setIsDarkThemed] = useState(false);

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

  return { isDarkThemed };
};
