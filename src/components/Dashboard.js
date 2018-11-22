import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, Input, Button, ButtonGroup, Row, Col, Table } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faStroopwafel, faChevronLeft, faChevronRight)

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true,
      country: [],
      count: [],
      portNo: [],
      portCount: [],
      page: 1,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  myCallback = (dataFromChild) => {
    this.setState({ sideBar: dataFromChild });
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
    fetch('http://10.3.132.187:3000/country')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
          for (var i = 0; i< 10; i++) {
            var addCountry = this.state.country.concat(data[0][i].key);
            var addCount = this.state.count.concat(data[0][i].doc_count);
            // console.log(data[0][i])
            this.setState({ country: addCountry });
            this.setState({ count: addCount });
          }
      })
      fetch('http://10.3.132.187:3000/port')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
          for (var i = 0; i< 1000; i++) {
            var addPort = this.state.portNo.concat(data[0][i].key);
            var addCount = this.state.portCount.concat(data[0][i].doc_count);
            // console.log(data[0][i])
            this.setState({ portNo: addPort });
            this.setState({ portCount: addCount });
          }
      })
  }


  getOption = () => ({
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      type: 'category',
      nameTextStyle: {
        color: '#fff',
        fontSize: 14
      },
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      },
      data: [this.state.portNo[0], this.state.portNo[1], this.state.portNo[2], this.state.portNo[3], this.state.portNo[4]]
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#fff',
        fontSize: 14
      },
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [{
        data: [this.state.portCount[0], this.state.portCount[1], this.state.portCount[2], this.state.portCount[3], this.state.portCount[4]],
        type: 'bar'
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
          <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
            <CardBody>
              <CardTitle>
                <Row>
                  <Col xs="12" md="4" lg="8"><h2>Visualize well known port</h2></Col>
                  <Col xs="12" md="8" lg="4">
                    <ButtonGroup>
                      <Button>port no.</Button>
                      <Button>port no.</Button>
                      <Button>port no.</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardTitle>
              <ReactEcharts
                option={this.getOption()}
                style={{height: '400px', width: '100%'}}
                opts={{ renderer: 'svg' }}
                className='react_for_echarts'
                />
            </CardBody>
          </Card>
        </div>
        <div className="card-box">
          <Row>
            <Col lg="6">
              <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
                <CardBody>
                  <CardTitle>
                    <Row>
                      <Col xs="12" md="8" lg="8"><h4>Country</h4></Col>
                    </Row>
                  </CardTitle>
                  <Table className="table-text">
                    <thead>
                      <tr className="text-center">
                        <th>
                          Rank
                        </th>
                        <th>
                          Country
                        </th>
                        <th className="text-center">
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        numbers.map((d, index) => {
                          return <tr key={index}>
                            <td>{d+1}</td>
                            <td>{this.state.country[d]}</td>
                            <td>{this.state.count[d]}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
                <CardBody>
                  <CardTitle>
                    <Row>
                      <Col xs="6" md="6" lg="8"><h4>Port</h4></Col>
                      <Col xs="6" md="6" lg="4"><Input type="text" value={this.state.value} onChange={this.handleChange} name="search" id="searchPort" placeholder="Search" /></Col>
                    </Row>
                  </CardTitle>
                  <Table className="table-text">
                    <thead>
                      <tr className="text-center">
                        <th>
                          Port No.
                        </th>
                        <th>
                          Name
                        </th>
                        <th className="text-center">
                          Count
                        </th>
                        <th className="text-center">
                          Source IP
                        </th>
                        <th className="text-center">
                          Destination IP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        numbers.map((d,index) => {
                          d += (10*(this.state.page-1));
                          // console.log(d);
                          return <tr key={index}>
                            <td>{this.state.portNo[d]}</td>
                            <td>...</td>
                            <td>{this.state.portCount[d]}</td>
                            <td>...</td>
                            <td>...</td>
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
                            // console.log(b);
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
          </Row>
        </div>
      </div>
    );
  }
}