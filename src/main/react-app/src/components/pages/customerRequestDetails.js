import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import axios from 'axios';

class customerRequestDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests:[]
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/api/auth/requests")
        .then(response => response.data)
        .then((data)=>{
           
            console.log('hijjhh');
            this.setState({requests:data});
        });
        document.title = 'Customer';
    }

 

   

    render() {
        const {cname, cnic, cemail, cphone, creason} = this.state;

        return (
            <div>
                <h1>Hi</h1>
                <div className="container mgntop">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Email</th>
                            <th>contact No</th>
                            <th>Reason</th>
                            <th>Is Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                    this.state.requests.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">{this.state.requests.length} No Requests Available.</td>
                                    </tr> :
                                    this.state.requests.map((request)=> (

                        <tr key={request.id}>
                            <td>1</td>
                            <td>{request.c_name}</td>
                            <td>{request.c_nic}</td>
                            <td>{request.email}</td>
                            <td>{request.phone}</td>
                            <td>{request.reason}</td>
                            <td>Completed</td>
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