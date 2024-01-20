import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function TemporaryDrawer() {
const [open,setOpen]=React.useState(false);

  

  return (
    <div>
     
          <IconButton onClick={()=>setOpen(true)}><MenuRoundedIcon className='link'/></IconButton>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>setOpen(false)}
          >
           <div className="drawer-div">
           <Link to="/"><p className='link'>Home</p>
</Link>
<Link to="/compare"><p className='link'>Compare</p>
</Link>
<Link to="/watchlist"><p className='link'>WatchList</p>
</Link>
<Link to="/dashboard"><p className='link'>Dashboard</p>
</Link>
            </div>
          </Drawer>
       
    </div>
  );
}