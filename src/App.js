import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import MainComponent from "./components/LandingPage/MainComponent";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import WatchListPage from "./pages/WatchListPage";
const App=()=>{
    return (
        
        <div className="App">
         <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/>
          <Route path="/compare" element={<ComparePage/>}/> 
           <Route path="/watchlist" element={<WatchListPage/>}/>  
         
         </Routes>
         </BrowserRouter>
        </div>
    )
}

export default App;