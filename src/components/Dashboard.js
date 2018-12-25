import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, Input, Button, ButtonGroup, Row, Col, Table } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { isNumber } from 'util';
library.add(faChartPie, faStroopwafel, faChevronLeft, faChevronRight)

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: true,
      country: null,
      port: null,
      value: '',
      page: 1,
      display: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value, page: 1});
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
        this.setState({ country: data[0] });
      })
      fetch('http://10.3.132.187:3000/port')
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        this.setState({ port: data[0] });
      })
  }


  getOption = () => ({
    tooltip: {},
    legend: {
      data:['销量']
    },
    // color: '#1d8cf8',
    color: '#E669B9',
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
      data: [this.state.port[0].key, this.state.port[1].key, this.state.port[2].key, this.state.port[3].key, this.state.port[4].key]
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
        data: [this.state.port[0].doc_count, this.state.port[1].doc_count, this.state.port[2].doc_count, this.state.port[3].doc_count, this.state.port[4].doc_count],
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
                    {/* <ButtonGroup>
                      <Button>port no.</Button>
                      <Button>port no.</Button>
                      <Button>port no.</Button>
                    </ButtonGroup> */}
                  </Col>
                </Row>
              </CardTitle>
              {
                this.state.port &&
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
                        this.state.country &&
                        numbers.map((d, index) => {
                          return <tr key={index} className={ this.state.checkSearch ? "show" : ""}>
                            <td>{d+1}</td>
                            <td>{this.state.country[d].key}</td>
                            <td>{this.state.country[d].doc_count}</td>
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
                  {
                    this.state.port && 
                    <Table className="table-text" id="port-table">
                      <thead>
                        <tr className="text-center">
                          <th>
                            Port No.
                          </th>
                          <th className="text-center">
                            Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.port
                            // .filter(item => item.key.toString().indexOf(this.state.value) > -1 || this.state.value == '')
                            .filter(item => item.key.toString() == this.state.value || this.state.value == '')
                            .filter((item,index) => {
                              // console.log(index);
                              if(index >= (this.state.page-1)*10 && index < (this.state.page)*10){
                                console.log(index)
                              }
                              return index >= (this.state.page-1)*10 && index < (this.state.page)*10;
                            })
                            .map((item,index) => {
                              return  <tr key={index}>
                              <td>{item.key}</td>
                              <td>{item.doc_count}</td>
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
                            // console.log(b);
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
          </Row>
        </div>
      </div>
    );
  }
}