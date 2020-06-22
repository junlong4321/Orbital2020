import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './container/Login/Login';
import Home from './container/Home/Home';
import Stocks from './container/Stocks/Stocks';
import News from './container/News/News';
import SignUp from './container/Login/SignUp/SignUp';
import './App.css';

class App extends Component {
  render() {
    return ( 
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/home" exact component={Home} />
          <Route path="/stocks" exact component={Stocks} />
          <Route path="/news" exact component={News} />
        </div>
      </BrowserRouter>
      
      )
    }
  }
  
  export default App;
  