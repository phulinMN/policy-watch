import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import NavbarApp from './components/NavbarApp'
import User from './components/User'
import Dashboard from './components/Dashboard'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true,
      path: 'home'
    };
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  
  myCallback = (dataFromChild) => {
    this.setState({ sideBar: dataFromChild });
    console.log(this.state.sideBar)
  }

  getComponent = (p) => {
    this.setState({path: p});
    // console.log(this.state.path);
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavbarApp callbackFromParent={this.myCallback} getComponent={this.getComponent}></NavbarApp>
          </header>
          <Route exact path="/" component={Dashboard} />
          <Route path="/user-request" component={User} />
        </div>
      </Router>
    );
  }
}


export default App;
