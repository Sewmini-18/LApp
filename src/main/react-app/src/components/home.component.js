import React, { Component } from 'react';
import { Row, Jumbotron, } from 'react-bootstrap'
//import Chart from './chart.js';

export default class Home extends Component {

  componentDidMount() {
    document.title = 'Home'
  }

  render() {
    return (
      <div className='container mgntop'>
        <h2>Home</h2>
        <Row>
          <Jumbotron style={{ width: '64rem' }}>
            <h1>Hello, User!</h1>

            <p>
              Welcome to the login solution requirement system... <br />Team Fork - No 25
            </p>
            {/*<div>
              <Chart />
            </div>*/}
          </Jumbotron>
        </Row>
      </div>
    );
  }
}
