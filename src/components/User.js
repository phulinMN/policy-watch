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
      collapse: false
    };
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

  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
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
                          Request Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Button color="link" onClick={this.toggleCollapse}>sdfsdf@ku.th</Button></td>
                        <td>1000</td>
                      </tr>
                      <tr>
                        <td>sdfsdf@ku.th</td>
                        <td>1000</td>
                      </tr>
                      <tr>
                        <td>sdfsdf@ku.th</td>
                        <td>1000</td>
                      </tr>
                      <tr>
                        <td>sdfsdf@ku.th</td>
                        <td>1000</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Collapse isOpen={this.state.collapse}>
                <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
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