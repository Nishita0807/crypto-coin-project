import * as React from 'react';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid';
import "./styles.css";
import List from '../List';

export default function TabsComponent({ coins, onToggleWatchlist, isLightTheme}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const style={
  color: isLightTheme ? "var(--black)" : "var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"Inter",
    textTransform:"capitalize"
}
  return (
    <div >
      <TabContext value={value}>
              
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style}/>
            <Tab label="List" value="list" sx={style}/>
          </TabList>
      
        <TabPanel value="grid">
        <div className='grid-flex'>
            {coins.map((coin, i) => (
              <Grid coin={coin} key={i} onToggleWatchlist={onToggleWatchlist} />
            ))}
          </div>
        </TabPanel>
        <TabPanel value="list">
        <table className='list-table'>
        {coins.map((item, i) => (
              <List coin={item} key={i} onToggleWatchlist={onToggleWatchlist} />
            ))}
            </table>
        </TabPanel>
      </TabContext>
    </div>
  );
}