import React, { useState, useEffect } from 'react';
import "./styles.css";
import Tooltip from '@mui/material/Tooltip';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { convertNumbers } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
import { StarBorder } from '@mui/icons-material';
import { Star } from '@mui/icons-material';

function List({ coin, onToggleWatchlist }) {
  const watchlistLocalStorageKey = 'watchlist';
  const [isWatchlisted, setIsWatchlisted] = useState(localStorage.getItem(watchlistLocalStorageKey)?.includes(coin.id));

  const [starColor, setStarColor] = useState('');

  useEffect(() => {
    // Update star color based on trend
    const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
    setStarColor(color);
  }, [coin.price_change_percentage_24h]);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    const updatedValue = !isWatchlisted;
    setIsWatchlisted(updatedValue);

    // Get the existing watchlist from local storage
    const existingWatchlist = JSON.parse(localStorage.getItem(watchlistLocalStorageKey)) || [];

    // Update the watchlist based on the toggle action
    const updatedWatchlist = updatedValue
      ? [...existingWatchlist, coin.id]
      : existingWatchlist.filter(id => id !== coin.id);

    // Save the updated watchlist to local storage
    localStorage.setItem(watchlistLocalStorageKey, JSON.stringify(updatedWatchlist));

    // Call the onToggleWatchlist function passed from the parent component
    onToggleWatchlist(coin.id);
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className='list-row'>
        <Tooltip title="Coin Logo" placement='bottom-start'>
          <td className='td-image'>
            <img src={coin.image} className='coin-logo' />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info" placement='bottom-start'>
          <td>
            <div className='name-col'>
              <p className='coin-symbol'>{coin.symbol}</p>
              <p className='coin-name'>{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Price Change in 24 Hours" placement='bottom-start'>
          {coin.price_change_percentage_24h > 0 ? (
            <td className='chip-flex'>
              <div className='price-chip'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='icon-chip td-icon'><TrendingUpRoundedIcon /></div>
            </td>
          ) : (
            <td className='chip-flex'>
              <div className='price-chip chip-red'>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className='icon-chip chip-red td-icon'><TrendingDownRoundedIcon /></div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price" placement='bottom-end'>
          <td>
            <h3
              className='coin-price td-center-align'
              style={{
                color: coin.price_change_percentage_24h < 0 ? 'var(--red)' : 'var(--green)',
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume" placement='bottom-end'>
          <td>
            <p className='total_volume td-right-align td-total-volume'>{coin.total_volume.toLocaleString()}</p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className='desktop-td-mkt'>
            <p className='total_volume td-right-align'>${coin.market_cap.toLocaleString()}</p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className='mobile-td-mkt'>
            <p className='total_volume td-right-align'>${convertNumbers(coin.market_cap)}</p>
          </td>
        </Tooltip>
        <Tooltip title="Watchlist" placement='bottom-end'>
        <div
            style={{ border: `2px solid ${starColor}`, padding: '1rem', borderRadius: '50%' }}
            className='grid-watchlist'
            onClick={(e) => handleWatchlistToggle(e)}
          >
            {isWatchlisted ? <Star style={{ color: starColor }} /> : <StarBorder style={{ color: starColor }} />}
          </div>
        </Tooltip>
      </tr>
    </Link>
  );
}

export default List;
