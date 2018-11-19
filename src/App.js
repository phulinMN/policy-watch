import React, { Component } from 'react';
import logo from './logo.svg';
import NavbarApp from './components/NavbarApp'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Table } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faStroopwafel)
// echarts.registerTheme('dark', {
//   backgroundColor: '#f4cccc'
// });
class App extends Component {
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
  getOption = () => ({
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
  })
  render() {
    let data = []
    for (var i = 0; i < 10; i++) {
      data.push(i);
    }
    // var request = require('request');
    // request.get();
    var request = require('request');

    var options = {
      url: '10.3.132.187:3000/country',
      headers: {
        'User-Agent': 'request'
      }
    };

    function callback(error, response, body) {

      console.log(error);
      console.log(body);
      console.log(response);
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        // console.log(info.stargazers_count + " Stars");
        // console.log(info.forks_count + " Forks");
      }
    }

    request(options, callback);
    return (
      <div className="App">
        <header className="App-header">
          <NavbarApp callbackFromParent={this.myCallback}></NavbarApp>
        </header>
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
                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                <CardText>
                  {/* <ReactEcharts
                    option={this.getOption()}
                    style={{height: '400px', width: '100%'}}
                    opts={{ renderer: 'svg' }}
                    className='react_for_echarts'
                    /> */}
                </CardText>
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
                    <Col xs="12" md="8" lg="8"><h4>Visualize well known port</h4></Col>
                  </Row>
                </CardTitle>
                <CardText>
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
                        data.map(d => {
                          return <tr>
                            <td>{d}</td>
                            <td>{d}</td>
                            <td>{d}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </Table>
                </CardText>
              </CardBody>
            </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
