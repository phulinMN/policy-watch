import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faStroopwafel, faChevronLeft, faChevronRight)

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true
    };
  }
  myCallback = (dataFromChild) => {
    this.setState({ sideBar: dataFromChild });
  // console.log(this.state.sideBar)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.callbackFromParent(this.state.isOpen);
  }

  render() {
    return (
      <div className={ this.state.sideBar ? "content" : "content expand"}>
        user
      </div>
    );
  }
}