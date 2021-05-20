import React, { useState, useEffect } from 'react'

export default function useTheme(
  defaultTheme = { mode: 'light', textZoom: 'normal' }
) {
  const [theme, _setTheme] = useState(getInitialTheme);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme
      ? JSON.parse(savedTheme)
      : defaultTheme;
  }

  useEffect(
    () => {
        localStorage.setItem('theme', JSON.stringify(theme));
    },
    [theme]
  );

  return {
    ...theme,
    setTheme: ({ setTheme, ...theme }) => _setTheme(theme)
  };
}
