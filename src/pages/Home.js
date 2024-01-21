import React, { useState, useEffect } from 'react';
import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";

function HomePage() {
  const [isLightTheme, setIsLightTheme] = useState(localStorage.getItem('theme') === 'light');

  const dummyOnThemeToggle = () => {
    // Toggle between light and dark themes
    const newTheme = !isLightTheme;
    setIsLightTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    // Apply theme to the body when the component mounts
    document.body.classList.toggle('light-theme', isLightTheme);
  }, [isLightTheme]);

  return (
    <div>
      {/* Pass dummyOnThemeToggle to Header in HomePage */}
      <Header onThemeToggle={dummyOnThemeToggle} />
      <MainComponent />
    </div>
  );
}

export default HomePage;
