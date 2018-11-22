import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import NavbarApp from './components/NavbarApp'
import User from './components/User'
import Dashboard from './components/Dashboard'

// import { Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table } from 'reactstrap';
// import ReactEcharts from 'echarts-for-react';
// import './App.css';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChartPie, faStroopwafel, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
// library.add(faChartPie, faStroopwafel, faChevronLeft, faChevronRight)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true,
      country: [],
      count: [],
      portNo: [],
      portCount: [],
      page: 1
    };
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  
  myCallback = (dataFromChild) => {
    this.setState({ sideBar: dataFromChild });
    // console.log(this.state.sideBar)
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavbarApp callbackFromParent={this.myCallback}></NavbarApp>
          </header>
          <Route path="/" component={Dashboard} />
          <Route path="/user-request" component={User} />
        </div>
      </Router>
    );
  }
}

export default App;
