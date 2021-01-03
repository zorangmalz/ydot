import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen/SplashScreen';
import HomeMain from './components/Home/HomeMain';
import Creator from './components/Home/Creator';
import FundMain from './components/Auction/FundMain';
import AuctionCreator from './components/Auction/AuctionCreator';
import PrivateRoute from "./components/PrivateRoute"
import Asset from './components/Asset/Asset';
import { MyInfo, PopupOne, PopupThree, PopupTwo } from './components/Style';
import LoginScreen from './components/SplashScreen/LoginScreen';
import Data from './components/jsondata';

function App() {
  return (
    <>
      <Data />
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
