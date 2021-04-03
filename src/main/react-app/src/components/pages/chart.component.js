import React, {Component} from "react";
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2'

import {Card} from "react-bootstrap";

class HorizontalBarChart extends Component {
    state = {
        data1: [],
        loading: false,
        labels1: [[]],
        data2: [],
        labels2: [[]],
        data3: [],
        labels3: [[]],
        data4: [],
        labels4: [[]],
        data5: [],
        labels5: [[]],
        data6: [],
        labels6: [[]],
        data7: [],
        labels7: [[]]
    };

    async componentDidMount() {
        await axios
            .get(
                `http://localhost:8080/api/auth/log?fileId=${this.props.match.params.id}`
            )
            .then((res) => {
                console.log(res.data);
                //1st chart
                const dataArrayY1 = [];
                res.data.map(item => {
                    dataArrayY1.push(item.length)
                })
                const dataArrayX1 = []
                res.data.map(item => {
                    dataArrayX1.push(item.source)
                })
                this.setState({
                    data1: dataArrayY1,
                    labels1: dataArrayX1,
                });
                //2nd chart
                const dataArrayY2 = [];
                res.data.map(item => {
                    dataArrayY2.push(item.time)
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
                    dataArrayY4.push(item.time)
                })
                const dataArrayX4 = []
                res.data.map(item => {
                    dataArrayX4.push(item.destination)
                })
                this.setState({
                    data4: dataArrayY4,
                    labels4: dataArrayX4,
                });
                //5th chart
                const dataArrayY5 = [];
                res.data.map(item => {
                    dataArrayY5.push(item.source)
                })
                let tmp5 = [];
                let count5=1
                res.data.map((o, i) => {
                    const existing = tmp5.find(e => e.source == o.source);
                    if (existing) {
                        existing.count5++;
                    } else {
                        tmp5.push({count5: count5, source: o.source});
                    }
                })

                this.setState({
                    data5: tmp5.map(o => o.count5),
                    labels5: tmp5.map(o => o.source),
                });
                //6th chart
                const dataArrayY6 = [] ;
                res.data.map(item => {
                    dataArrayY6.push(item.destination)
                })
                let tmp6 = [];
                let count6=1;
                res.data.map((o, i) => {
                    const existing = tmp6.find(e => e.destination == o.destination);
                    if (existing) {
                        existing.count6++ ;
                    } else {
                        tmp6.push({count6: count6, destination: o.destination});
                    }
                })

                this.setState({
                    data6: tmp6.map(o => o.count6),
                    labels6: tmp6.map(o => o.destination),
                });
                //7th chart
                const dataArrayY7 = [] ;
                res.data.map(item => {
                    dataArrayY7.push(item.protocol)
                })
                let tmp7 = [];
                let count7=1;
                res.data.map((o, i) => {
                    const existing = tmp7.find(e => e.protocol == o.protocol);
                    if (existing) {
                        existing.count7++ ;
                    } else {
                        tmp7.push({count7: count7, protocol: o.protocol});
                    }
                })

                this.setState({
                    data7: tmp7.map(o => o.count7),
                    labels7: tmp7.map(o => o.protocol),
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
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Source vs Length</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels1,
                                datasets: [{
                                    label: 'source vs Length',
                                    data: this.state.data1,
                                    backgroundColor: 'blue'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Source vs Time</Card.Title>
                        <Line
                            data={{
                                labels: this.state.labels2,
                                datasets: [{
                                    label: 'source vs time',
                                    data: this.state.data2,
                                    borderColor: 'purple'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Destination vs Length</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels3,
                                datasets: [{
                                    label: 'destination vs length',
                                    data: this.state.data3,
                                    backgroundColor: 'green'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Destination vs Time</Card.Title>
                        <Line
                            data={{
                                labels: this.state.labels4,
                                datasets: [{
                                    label: 'destination vs time',
                                    data: this.state.data4,
                                    borderColor: 'red'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Source vs Count</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels5,
                                datasets: [{
                                    label: 'Source vs count',
                                    data: this.state.data5,
                                    borderColor: 'red',
                                    backgroundColor: 'yellow'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Destination vs Count</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels6,
                                datasets: [{
                                    label: 'Destination vs count',
                                    data: this.state.data6,
                                    borderColor: 'red',
                                    backgroundColor: 'orange'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
                <Card border="primary" style={{width: '95rem', height: '25rem'}}>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Protocol vs Count</Card.Title>
                        <Bar
                            data={{
                                labels: this.state.labels7,
                                datasets: [{
                                    label: 'Protocol vs count',
                                    data: this.state.data7,
                                    backgroundColor: 'brown'
                                }],
                            }}
                            height={20}
                            width={95}
                            options={{maintainAspectRatio: false}}

                        />
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

export default HorizontalBarChart;
