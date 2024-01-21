import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import axios from 'axios';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);
  const [isLightTheme, setIsLightTheme] = useState(localStorage.getItem('theme') === 'light');

  const handlePageChange = (event, value) => {
    setPage(value);
    const previosIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previosIndex, previosIndex + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onToggleWatchlist = (id) => {
    const updatedWatchlist = [...watchlist];
    const index = updatedWatchlist.indexOf(id);
  
    if (index === -1) {
      updatedWatchlist.push(id);
    } else {
      updatedWatchlist.splice(index, 1);
    }
  
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleThemeToggle = () => {
    const newTheme = !isLightTheme;
    setIsLightTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header onThemeToggle={handleThemeToggle} isLightTheme={isLightTheme} />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : paginatedCoins} onToggleWatchlist={onToggleWatchlist} isLightTheme={isLightTheme} />
          {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} isLightTheme={isLightTheme}/>}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
