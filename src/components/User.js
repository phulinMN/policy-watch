import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table, Collapse } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
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
      user: null,
      info: null,
      userIP: null,
      page: 1,
      value: 0,
      r: 1,
      checked: false,
      data: {
        nodes: [],
        links: []
      }
    };
    this.switchGraph = this.switchGraph.bind(this);
    this.getDataSankey = this.getDataSankey.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onNext = this.onNext.bind(this);
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
    // console.log(p);
    this.setState({ collapse: this.state.collapse });
    if (p != this.state.value) {
      this.setState({ value: p });
    }
    fetch('http://10.3.132.187:3000/user_info/'+ p)
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        this.setState({ userIP: data[0] });
        // console.log(this.state.userIP);
      })
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

  onNext(rSelected) {
    if(rSelected == "back") {
      if(this.state.r != 1) {
        this.state.r--;
      } else {
        this.state.r = 1;
      }
    } else if (rSelected == "next") {
      this.state.r++;
    }  else {
      this.state.r = rSelected;
    }
    rSelected = this.state.r;
    this.setState({ rSelected });
  }

  componentDidMount() {
    fetch('http://10.3.132.187:3000/user')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        this.setState({ user: data[0]});
        // console.log(this.state.user[0].key);
      })
    fetch('http://10.3.132.187:3000/user_send_info')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        this.setState({ info: data[0]});
        this.getDataTreemap();
      })
  }
  switchGraph(event) {
    this.setState({ checked: !this.state.checked });
    console.log(this.state.checked);
  }

  getDataTreemap() {
    const info = this.state.info;
    const data = [];
    var child = {};
    for (let i = 0; i <= 100; i++) {
      if (i > 0) {
        data.push({
          name: info[i].key,
          value: info[i].byte_send.value
        });
      } 
    }
    this.setState({
      data: data
    })
  }

  getOption = () => ({
    series: [{
      type: 'treemap',
      data: this.state.data
    }]
  })

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
                      {
                        !this.state.checked &&
                        <Col xs="10" md="10" lg="10"><h4>Flow Count</h4></Col>
                      }
                      {
                        this.state.checked &&
                        <Col xs="10" md="10" lg="10"><h4>Flow-Byte</h4></Col>
                      }
                      <Col xs="2" md="2" lg="2">
                        <ToggleSwitch
                          checked={this.state.checked}
                          onChange={this.switchGraph}
                        />
                      </Col>
                    </Row>
                  </CardTitle>
                  {
                    !this.state.checked &&
                    <Table className="table-text">
                      <thead>
                        <tr className="text-center">
                          <th>
                            User ID
                          </th>
                          <th>
                          Flow Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.user &&
                          numbers.map((d,index) => {
                            d += (10*(this.state.page-1));
                            return <tr key={index}>
                              <td className="table-hover" value={this.state.user[d].key} onClick={() => this.toggleCollapse(this.state.user[d].key)}>{this.state.user[d].key}</td>
                              <td className="text-center">{this.state.user[d].doc_count}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </Table>
                  }
                  {
                    this.state.checked &&
                    <Table className="table-text">
                      <thead>
                        <tr className="text-center">
                          <th>
                            User ID
                          </th>
                          <th>
                          Packet Send
                          </th>
                          <th>
                          Byte Send
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.info &&
                          numbers.map((d,index) => {
                            d += (10*(this.state.page-1));
                            return <tr key={index}>
                              <td className="table-hover" value={this.state.info[d].key} onClick={() => this.toggleCollapse(this.state.info[d].key)}>{this.state.info[d].key}</td>
                              <td className="text-center">{this.state.info[d].packet_send.value}</td>
                              <td className="text-center">{this.state.info[d].byte_send.value}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </Table>
                  }
                  <Row>
                    <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }}>
                      <ButtonGroup>
                        <Button className="button-style" onClick={() => this.onRadioBtnClick('back')}><FontAwesomeIcon icon="chevron-left" size="lg" /></Button>
                        {
                          buttons.map((b, index) => {
                            let i = 0;
                            if (this.state.page%5 != 0) {
                              i = Math.floor(this.state.page/5);
                            } else {
                              i = (this.state.page/5) - 1;
                            }
                            b += i*5;
                            return <Button className="button-style" key={index} onClick={() => this.onRadioBtnClick(b)} active={this.state.page === b}>{b}</Button>
                          })
                        }
                        <Button className="button-style" onClick={() => this.onRadioBtnClick('next')}><FontAwesomeIcon icon="chevron-right" size="lg" /></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Collapse isOpen={this.state.collapse}>
                <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
                  <CardBody>
                    <CardTitle>
                      <Row>
                        <Col xs="10" md="10" lg="10"><h4>{this.state.value}</h4></Col>
                      </Row>
                    </CardTitle>
                    <Table className="table-text">
                      <thead>
                        <tr className="text-center">
                          <th>IP</th>
                          <th>Count</th>
                          {/* <th>Destination Port/IP</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.userIP &&
                          numbers.map((d,index) => {
                            d += (10*(this.state.r-1));
                            return <tr key={index}>
                              <td>{this.state.userIP[d].key}</td>
                              <td>{this.state.userIP[d].doc_count}</td>
                              {/* <td>
                                <ButtonGroup>
                                  <Button size="sm">Port</Button>
                                  <Button size="sm">IP</Button>
                                </ButtonGroup>
                              </td> */}
                            </tr>
                          })
                        }
                      </tbody>
                    </Table>
                    <Row>
                      <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }}>
                        <ButtonGroup>
                          <Button className="button-style" onClick={() => this.onNext('back')}><FontAwesomeIcon icon="chevron-left" size="lg" /></Button>
                          {
                            buttons.map((b, index) => {
                              let i = 0;
                              if (this.state.r%5 != 0) {
                                i = Math.floor(this.state.r/5);
                              } else {
                                i = (this.state.r/5) - 1;
                              }
                              b += i*5;
                              return <Button className="button-style" key={index} onClick={() => this.onNext(b)} active={this.state.r === b}>{b}</Button>
                            })
                          }
                          <Button className="button-style" onClick={() => this.onNext('next')}><FontAwesomeIcon icon="chevron-right" size="lg" /></Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Collapse>
            </Col>
          </Row>
        </div>
        <div className="card-box">
          <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
            <CardBody>
              <CardTitle>
                <Row>
                  <Col xs="12" md="4" lg="8"><h2>Visualize User => Port IP</h2></Col>
                </Row>
              </CardTitle>
              {
                this.state.data &&
                <ReactEcharts
                option={this.getOption()}
                style={{height: '400px', width: '100%'}}
                opts={{ renderer: 'svg' }}
                className='react_for_echarts'
                />
              }
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}