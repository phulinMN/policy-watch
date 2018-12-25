import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table, Collapse, Input } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faStroopwafel, faChevronLeft, faChevronRight)

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true,
      collapse: false,
      user: null,
      userIP: null,
      port: null,
      page: 1,
      value: 0,
      input: '',
      r: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onNext = this.onNext.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  myCallback = (dataFromChild) => {
    this.setState({ sideBar: dataFromChild });
  }
  handleChange(event) {
    this.setState({input: event.target.value, page: 1});
  }

  

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.callbackFromParent(this.state.isOpen);
  }

  toggleCollapse(p) {
    this.setState({
      collapse: true,
      value: p
    });
    // console.log('sdfsdf')
    fetch('http://10.3.132.187:3000/port_ip')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        this.state.user.filter((item,index) => {
            return item.key == p;
        }).map((item, index) => {
            this.setState({ port: item.port.buckets});
        })
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
    fetch('http://10.3.132.187:3000/port_ip')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        // this.setState({ user: data[0], port: data[0][0].port.buckets});
        this.setState({ user: data[0]});
        // console.log(data[0][0].port.buckets);
      })
  }

  render() {
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
                        <Col xs="6" md="6" lg="8"><h4>IP Info</h4></Col>
                        <Col xs="6" md="6" lg="4"><Input type="text" value={this.state.input} onChange={this.handleChange} name="search" id="searchPort" placeholder="Search" /></Col>
                    </Row>
                  </CardTitle>
                    <Table className="table-text">
                      <thead>
                        <tr className="text-center">
                          <th>
                            User IP
                          </th>
                          <th>
                          Flow Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.user &&
                          this.state.user
                            .filter(item => item.key.toString().indexOf(this.state.input) > -1 || this.state.input == '')
                            .filter((item,index) => {
                              return index >= (this.state.page-1)*10 && index < (this.state.page)*10;
                            })
                            .map((item,index) => {
                            return <tr key={index}>
                              <td className="table-hover" value={item.key} onClick={() => this.toggleCollapse(item.key)}>{item.key}</td>
                              <td className="text-center">{item.doc_count}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </Table>
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
                          <th>Port</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.port &&
                          this.state.port
                            .filter((item,index) => {
                              return index >= (this.state.r-1)*10 && index < (this.state.r)*10;
                            })
                            .map((item,index) => {
                              return <tr key={index}>
                                <td>{item.key}</td>
                                <td>{item.doc_count}</td>
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
      </div>
    );
  }
}