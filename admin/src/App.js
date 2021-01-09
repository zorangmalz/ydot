import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Creator from './components/Auction/Creator';
import FundMain from './components/Auction/FundMain';
import UserList from "./components/Auction/UserList"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/fund" exact component={FundMain} />
          <Route path="/fund/:id"><Creator /></Route>
          <Route path="/user" exact component={UserList} />
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
