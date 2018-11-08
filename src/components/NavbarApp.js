import React, { Component } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faCoins } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faCoins)

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
        <SideNav
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
                      Dashboard 
                  </NavText>
              </NavItem>
              <NavItem eventKey="charts">
                  <NavIcon>
                    <FontAwesomeIcon icon="coins" color="white" size="lg" />
                  </NavIcon>
                  <NavText>
                      Web Mining
                  </NavText>
                  <NavItem eventKey="charts/linechart">
                      <NavText>
                          Line Chart
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="charts/barchart">
                      <NavText>
                          Bar Chart
                      </NavText>
                  </NavItem>
              </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div className={ this.state.isOpen ? "content expand" : "content"}>
          <h2 className="">Policy Watch</h2>
        </div>
      </div>
    );
  }
}
