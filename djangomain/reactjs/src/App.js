import React, { Component } from 'react';

import Navbar from './components/UI/Navbar/Navbar';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './containers/Home/Home';
import News from './containers/News/News';
import Stocks from './containers/Stocks/Stocks';
import Forum from './containers/Forum/Forum';
import Login from './containers/Login/Login';

class App extends Component {
  render() {
    return ( 
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Home}></Route>
        <Route path="/news" component={News}></Route>
        <Route path="/stocks" component={Stocks}></Route>
        <Route path="/forum" component={Forum}></Route>
        <Route path="/login" exact component={Login}></Route>
      </BrowserRouter>
    )
  }
}

export default App;
