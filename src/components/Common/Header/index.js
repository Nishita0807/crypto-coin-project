import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import TemporaryDrawer from './drawer';
import './styles.css';


function Header({ onThemeToggle }) {
  const initialTheme = localStorage.getItem('theme') === 'light';
  const [isLightTheme, setIsLightTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = !isLightTheme;
    setIsLightTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
    // Call the provided onThemeToggle function from DashboardPage
    onThemeToggle();
  };

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLightTheme);
  }, [isLightTheme]);


  return (
    <div className={`navbar ${isLightTheme ? 'light-theme' : ''}`}>
      <h1 className='logo' style={{ color: isLightTheme ? 'blue' : 'white' }}>
  CrytoTracker<span style={{ color: 'var(--blue)' }}>.</span>
  <input type='checkbox' checked={isLightTheme} onChange={toggleTheme} />

</h1>


      {/* Theme toggle switch */}

      <div className='links'>
        <Link to='/'>
          <p className='link'>Home</p>
        </Link>
        <Link to='/compare'>
          <p className='link'>Compare</p>
        </Link>
        <Link to='/watchlist'>
          <p className='link'>WatchList</p>
        </Link>
        <Link to='/dashboard'>
          <p className='link'>
            <Button text={'Dashboard'} onClick={() => console.log('button clicked')} />
          </p>
        </Link>
      </div>

      <div className='mobile-drawer'>
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
