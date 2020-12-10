import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen/SplashScreen';
import HomeMain from './components/Home/HomeMain';
import Creator from './components/Home/Creator';
import AuctionMain from './components/Auction/AuctionMain';
import AuctionCreator from './components/Auction/AuctionCreator';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={SplashScreen} />
          {/* 여기서 : id가 먼저 렌더링 될 수 있게 나와야 한다. */}
          <Route path="/home/:id"><Creator /></Route>
          <Route path="/home"><HomeMain /></Route>
          <Route path="/auction/:id"><AuctionCreator /></Route>
          <Route path="/auction"><AuctionMain /></Route>
        </Switch>
      </Router>
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
