import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';

export default class App extends Component {
  render() {
    // const renderCart = ({match,history})=>{
    //   return <Cart history={history} id={match.params.id}/>
    // }
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Navbar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </HashRouter>
    );
  }
}
