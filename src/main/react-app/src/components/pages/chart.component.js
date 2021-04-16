import React, {Component} from "react";
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2'

import {Card} from "react-bootstrap";
import {round} from "@tensorflow/tfjs-core";

class Chart extends Component {
    state = {
        loading: false,
        data1: [],
        labels1: [[]],
        data2: [],
        labels2: [[]],
        data3: [],
        labels3: [[]],
        data4: [],
        labels4: [[]],
        data5: [],
        labels5: [[]],
    };

    async componentDidMount() {
        await axios
            .get(
                `http://localhost:8080/api/auth/log?fileId=${this.props.match.params.id}`
            )
            .then((res) => {
                //1st chart
                const dataArrayY1 = [];
                res.data.map(item => {
                    dataArrayY1.push(item.source)
                })
                let tmp1 = [];
                let count1 = 1
                res.data.map((o) => {
                    const existing = tmp1.find(e => e.source === o.source);
                    if (existing) {
                        existing.count1++;
                    } else {
                        tmp1.push({count1: count1, source: o.source});
                    }
                })
                this.setState({
                    data1: tmp1.map(o => o.count1),
                    labels1: tmp1.map(o => o.source),
                });
                //2nd chart
                const dataArrayY2 = [];
                res.data.map(item => {
                    dataArrayY2.push(item.length)
                })
                const dataArrayX2 = []
                res.data.map(item => {
                    dataArrayX2.push(item.source)
                })
                this.setState({
                    data2: dataArrayY2,
                    labels2: dataArrayX2,
                });
                //3rd chart
                const dataArrayY3 = [];
                res.data.map(item => {
                    dataArrayY3.push(item.length)
                })
                const dataArrayX3 = []
                res.data.map(item => {
                    dataArrayX3.push(item.destination)
                })
                this.setState({
                    data3: dataArrayY3,
                    labels3: dataArrayX3,
                });
                //4th chart
                const dataArrayY4 = [];
                res.data.map(item => {
                    dataArrayY4.push(item.destination)
                })
                let tmp4 = [];
                let count4 = 1;
                res.data.map((o) => {
                    const existing = tmp4.find(e => e.destination === o.destination);
                    if (existing) {
                        existing.count4++;
                    } else {
                        tmp4.push({count4: count4, destination: o.destination});
                    }
                })
                this.setState({
                    data4: tmp4.map(o => o.count4),
                    labels4: tmp4.map(o => o.destination),
                });
                //5th chart
                const dataArrayY5 = [];
                res.data.map(item => {
                    dataArrayY5.push(item.protocol)
                })
                let tmp5 = [];
                let count5 = 1;
                res.data.map((o) => {
                    const existing = tmp5.find(e => e.protocol === o.protocol);
                    if (existing) {
                        existing.count5++;
                    } else {
                        tmp5.push({count5: count5, protocol: o.protocol});
                    }
                })
                this.setState({
                    data5: tmp5.map(o => o.count5),
                    labels5: tmp5.map(o => o.protocol),
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            loading: true,
        });
    }


    render() {
        return (
            <div>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Body>
                        <Card.Title>No. of times each source address accessed</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels1,
                                datasets: [{
                                    label: 'X-axis: Source address, Y-axis: Count',
                                    data: this.state.data1,
                                    backgroundColor: '#FFFF66',
                                    scaleBeginAtZero: true,
                                    borderColor: 'red',
                                    borderWidth: 2
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{
                                maintainAspectRatio: false, scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0
                                        }
                                    }]
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Body>
                        <Card.Title>Packet Length of each source addresses</Card.Title>
                        <Line
                            data={{
                                labels: this.state.labels2,
                                datasets: [{
                                    label: 'X-axis: Source address, Y-axis: Packet Length',
                                    data: this.state.data2,
                                    borderColor: 'blue',
                                    backgroundColor: '#99ccff',
                                    scaleBeginAtZero: true,
                                    lineJoin: round
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{
                                maintainAspectRatio: false, scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0
                                        }
                                    }]
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Body>
                        <Card.Title>Packet Length of each destination addresses</Card.Title>
                        <Line
                            data={{
                                labels: this.state.labels3,
                                datasets: [{
                                    label: 'X-axis: Destination address, Y-axis: Packet Length',
                                    data: this.state.data3,
                                    borderColor: 'green',
                                    backgroundColor: '#90ee90',
                                    scaleBeginAtZero: true,
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{
                                maintainAspectRatio: false, scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0
                                        }
                                    }]
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Body>
                        <Card.Title>No. of times each destination address accessed</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels4,
                                datasets: [{
                                    label: 'X-axis: Destination address, Y-axis: Count',
                                    data: this.state.data4,
                                    backgroundColor: '#fed8b1',
                                    scaleBeginAtZero: true,
                                    borderWidth: 2,
                                    borderColor: 'Maroon'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{
                                maintainAspectRatio: false, scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0
                                        }
                                    }]
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Body>
                        <Card.Title>No. of times each Protocol accessed</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels5,
                                datasets: [{
                                    label: 'X-axis: Type of Protocol, Y-axis: Count',
                                    data: this.state.data5,
                                    backgroundColor: '#b19cd9',
                                    scaleBeginAtZero: true,
                                    borderWidth: 2,
                                    borderColor: 'Purple'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{
                                maintainAspectRatio: false, scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0
                                        }
                                    }]
                                }
                            }}
                        />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Chart;
