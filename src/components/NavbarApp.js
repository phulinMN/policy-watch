import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faUser)

export default class NavbarApp extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.callbackFromParent(this.state.isOpen);
  }

  render() {
    return (
      <div>
        <SideNav style={{'position': 'fixed'}}
          onSelect={(selected) => {
              // Add your code here
              console.log('b')
          }}>
          <SideNav.Toggle
            onClick={this.toggle.bind(this)}
             />
          <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                  <NavIcon>
                    <FontAwesomeIcon icon="chart-pie" color="white" size="lg" />
                  </NavIcon>
                  <NavText>
                    <Link to="/">Dashboard</Link>
                  </NavText>
              </NavItem>
              <NavItem eventKey="charts">
                  <NavIcon>
                    <Link to="/user-request"><FontAwesomeIcon icon="user" color="white" size="lg" /></Link>
                  </NavIcon>
                  <NavText>
                      <Link to="/user-request">User Request</Link>
                  </NavText>
              </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div className={ this.state.isOpen ? "Navbar expand" : "Navbar"}>
          <h2 className="">Policy Watch</h2>
        </div>
      </div>
    );
  }
}
