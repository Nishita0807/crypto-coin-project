import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import BackToTop from '../components/Common/BackToTop';
import Loader from '../components/Common/Loader';
import { get100Coins } from '../functions/get100Coins';
import TabsComponent from '../components/Dashboard/Tabs';
import PaginationComponent from '../components/Dashboard/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

// ... (your imports)

function WatchListPage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(parseInt(sessionStorage.getItem('watchlistPage')) || 1); // Current page state
  const [initialLoad, setInitialLoad] = useState(true); // Control initial loading
  const coinsPerPage = 10; // Number of coins to display per page

  useEffect(() => {
    getData();
  }, [watchlist, page]); // Trigger getData whenever watchlist or page changes

  useEffect(() => {
    if (initialLoad) {
      getData();
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const notifyPageChange = (newPage) => {
    toast.info(`Navigated to page ${newPage}`);
  };

  const getData = async () => {
    try {
      const myCoins = await get100Coins();

      if (myCoins) {
        // Filter coins based on the watchlist
        const filteredCoins = myCoins.filter((coin) => watchlist.includes(coin.id));

        // Calculate the range of coins to display based on the current page
        const startIndex = (page - 1) * coinsPerPage;
        const endIndex = startIndex + coinsPerPage;

        setCoins(filteredCoins.slice(startIndex, endIndex));
        setIsLoading(false);

        // Check if the current page has no coins
        if (filteredCoins.length === 0) {
          // Navigate to the previous page
          const previousPage = Math.max(1, page - 1);
          setPage(previousPage);
          sessionStorage.setItem('watchlistPage', previousPage.toString()); // Save the page in sessionStorage
          notifyPageChange(previousPage);
          return; // Exit the function to prevent setting state with an invalid page
        }
      }
    } catch (error) {
      console.error('Error fetching coins:', error);
      setIsLoading(false);
    }
  };

  const onToggleWatchlist = (id) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = [...prevWatchlist];
      const index = updatedWatchlist.indexOf(id);

      if (index !== -1) {
        updatedWatchlist.splice(index, 1);
        toast.success(`Coin with ID ${id} has been removed from your watchlist.`);
      }

      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      getData();

      return updatedWatchlist;
    });
  };

  const handlePageChange = (event, newPage) => {
    // Update the page state
    setPage(newPage);
    sessionStorage.setItem('watchlistPage', newPage.toString()); // Save the page in sessionStorage
    notifyPageChange(newPage);
  };

  return (
    <>
      <Header />
      <BackToTop />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />

      {isLoading ? (
        <Loader />
      ) : watchlist.length <= 0 || watchlist.every(item => item === null) ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <h2>Your watchlist is empty!</h2>
          <Link to="/dashboard">
            <p style={{
              width: '100px !important',
              height: 'auto !important'
            }}><Button text={"Dashboard"} onClick={() => { console.log("button clicked") }} /></p>
          </Link>
        </div>
      ) : (
        <div>
          <TabsComponent coins={coins} onToggleWatchlist={onToggleWatchlist} />
          {watchlist.length > 10 && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
}

export default WatchListPage;

