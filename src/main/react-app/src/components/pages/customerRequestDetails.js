import React, { Component } from 'react';
import { Table, Button,Tooltip, OverlayTrigger } from 'react-bootstrap'
import axios from 'axios';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

class customerRequestDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            requests: [],

        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/auth/requests")
            .then(response => response.data)
            .then((data) => {

                console.log('hijjhh');
                this.setState({ requests: data });
            });
        document.title = 'Customer';
    }





    render() {
        const { cname, cnic, cemail, cphone, creason, date } = this.state;

        return (
            <div>
                <h4 style={{ textAlign: "center" }}>Request Details</h4>
                <div className="container mgntop">
                    <OverlayTrigger overlay={<Tooltip>Add request</Tooltip>}>
                        <span className="d-inline-block">
                        <a href="/home/customerform"><AddCircleOutlineRoundedIcon type="button"
                         style={{ alignItems: 'right', fontSize: '25px', color: 'black' }} /></a>
                        </span>
                    </OverlayTrigger>
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr style={{ color: 'white', background: '#343A40' }}>
                                <th>#</th>
                                <th>Name</th>
                                <th>NIC</th>
                                <th>Email</th>
                                <th>contact No</th>
                                <th>Reason</th>
                                <th>Date-Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.requests.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">{this.state.requests.length} No Requests Available.</td>
                                    </tr> :
                                    this.state.requests.map((request, index) => (

                                        <tr key={request.id}>
                                            <td>{1 + index++}</td>
                                            <td>{request.c_name}</td>
                                            <td>{request.c_nic}</td>
                                            <td>{request.email}</td>
                                            <td>{request.phone}</td>
                                            <td>{request.reason}</td>
                                            <td>{request.date}</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default customerRequestDetails;