import React, { Component } from 'react';
import logo from './logo.svg';
import NavbarApp from './components/NavbarApp'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col } from 'reactstrap';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faChartPie, faStroopwafel)

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavbarApp callbackFromParent={this.myCallback}></NavbarApp>
        </header>
        <div className={ this.state.sideBar ? "content" : "content expand"}>
          <div>
            <Card body inverse style={{ backgroundColor: 'rgb(39, 41, 61)' }}>
              <CardBody>
                <CardTitle>
                  <Row>
                    <Col xs="12" md="8" lg="8"><h2>Visualize well known port</h2></Col>
                    <Col xs="12" md="4" lg="4">
                      <ButtonGroup>
                        <Button>port no.</Button>
                        <Button>port no.</Button>
                        <Button>port no.</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
