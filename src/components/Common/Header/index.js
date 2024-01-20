import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import TemporaryDrawer from './drawer'
import "./styles.css"
function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>CrytoTracker<span style={{color:"var(--blue)"}}>.</span></h1>
      <div className='links'>
<Link to="/"><p className='link'>Home</p>
</Link>
<Link to="/compare"><p className='link'>Compare</p>
</Link>
<Link to="/watchlist"><p className='link'>WatchList</p>
</Link>
<Link to="/dashboard"><p className='link'><Button text={"Dashboard"} onClick={()=>{console.log("button clicked")}}/></p>
</Link>
      </div>
      <div className='mobile-drawer'>
        <TemporaryDrawer/>
      </div>
    </div>
  )
}

export default Header