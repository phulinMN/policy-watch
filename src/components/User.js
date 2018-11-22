import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table, Collapse } from 'reactstrap';
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
      sideBar: true,
      collapse: false,
      userId: [],
      count: [],
      page: 1,
      value: ''
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
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

  toggleCollapse(p) {
    this.state.collapse = true;
    console.log(this.state.collapse);
    this.setState({ collapse: this.state.collapse });
    this.setState({ value: p });
  }
  getUser(a) {
    // this.setState({value: a});
  }
  onRadioBtnClick(rSelected) {
    if(rSelected == "back") {
      if(this.state.page != 1) {
        this.state.page--;
      } else {
        this.state.page = 1;
      }
    } else if (rSelected == "next") {
      this.state.page++;
    } else {
      this.state.page = rSelected;
    }
    rSelected = this.state.page;
    this.setState({ rSelected });
  }

  componentDidMount() {
    fetch('http://10.3.132.187:3000/user')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        for (var i = 0; i< 1000; i++) {
          var addUser = this.state.userId.concat(data[0][i].key);
          var addCount = this.state.count.concat(data[0][i].doc_count);
          // console.log(data[0][i])
          this.setState({ userId: addUser });
          this.setState({ count: addCount });
        }
      })
  }

  render() {
    let numbers = []
    for (var i = 0; i < 10; i++) {
      numbers.push(i);
    }
    const buttons = [1, 2, 3, 4, 5];
    return (
      <div className={ this.state.sideBar ? "content" : "content expand"}>
        <div className="card-box">
          <Row>
            <Col lg="6">
              <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
                <CardBody>
                  <CardTitle>
                    <Row>
                      <Col xs="12" md="8" lg="8"><h4>User Request</h4></Col>
                    </Row>
                  </CardTitle>
                  <Table className="table-text">
                    <thead>
                      <tr className="text-center">
                        <th>
                          User ID
                        </th>
                        <th>
                          Request User
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        numbers.map((d,index) => {
                          d += (10*(this.state.page-1));
                          // console.log(d);
                          return <tr key={index}>
                            <td value={this.state.userId[d]} onClick={() => this.toggleCollapse(this.state.userId[d])}>{this.state.userId[d]}</td>
                            <td>{this.state.count[d]}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </Table>
                  <Row>
                    <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }}>
                      <ButtonGroup>
                        <Button onClick={() => this.onRadioBtnClick('back')}><FontAwesomeIcon icon="chevron-left" color="white" size="lg" /></Button>
                        {
                          buttons.map((b, index) => {
                            let i = 0;
                            if (this.state.page%5 != 0) {
                              i = Math.floor(this.state.page/5);
                            } else {
                              i = (this.state.page/5) - 1;
                            }
                            b += i*5;
                            return <Button key={index} onClick={() => this.onRadioBtnClick(b)} active={this.state.page === b}>{b}</Button>
                          })
                        }
                        <Button onClick={() => this.onRadioBtnClick('next')}><FontAwesomeIcon icon="chevron-right" color="white" size="lg" /></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Collapse isOpen={this.state.collapse}>
                <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
                  <CardTitle>
                      <Row>
                        <Col xs="12" md="8" lg="8"><h4>{this.state.value}</h4></Col>
                      </Row>
                    </CardTitle>
                  <CardBody>
                    <Table className="table-text">
                      <thead>
                        <tr className="text-center">
                          <th>User ID</th>
                          <th>IP Type</th>
                          <th>Source</th>
                          <th>Destination</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>sdfsdf@ku.th</td>
                          <td>1000</td>
                          <td>src</td>
                          <td>dest</td>
                        </tr>
                        <tr>
                          <td>sdfsdf@ku.th</td>
                          <td>1000</td>
                          <td>src</td>
                          <td>dest</td>
                        </tr>
                        <tr>
                          <td>sdfsdf@ku.th</td>
                          <td>1000</td>
                          <td>src</td>
                          <td>dest</td>
                        </tr>
                        <tr>
                          <td>sdfsdf@ku.th</td>
                          <td>1000</td>
                          <td>src</td>
                          <td>dest</td>
                        </tr>
                        <tr>
                          <td>sdfsdf@ku.th</td>
                          <td>1000</td>
                          <td>src</td>
                          <td>dest</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}