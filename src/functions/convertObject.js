export const coinObject = (setState, data) => {
    if (data && data.id) {
      setState({
        id: data.id,
        name: data.name || '',
        symbol: data.symbol || '',
        image: (data.image && data.image.large) || '',
        desc: (data.description && data.description.en) || '',
        price_change_percentage_24h: (data.market_data && data.market_data.price_change_percentage_24h) || 0,
        total_volume: (data.market_data && data.market_data.total_volume && data.market_data.total_volume.usd) || 0,
        current_price: (data.market_data && data.market_data.current_price && data.market_data.current_price.usd) || 0,
        market_cap: (data.market_data && data.market_data.market_cap && data.market_data.market_cap.usd) || 0,
      });
    } else {
      console.error('Invalid data structure or undefined data:', data);
    }
  };
  