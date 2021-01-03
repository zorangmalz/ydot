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

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home" exact component={SplashScreen} />
          <Route path="/login" component={LoginScreen} />
          {/* 여기서 : id가 먼저 렌더링 될 수 있게 나와야 한다. */}
          {/* 로그인 이후에는 그냥 route말고 미리 설정한 privateroute로 감싸기 */}
          <Route path="/fund/:id"><Creator /></Route>
          <Route path="/fund" component={FundMain} />
          <PrivateRoute path="/asset"><Asset /></PrivateRoute>
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
