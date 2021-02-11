import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

class customerRequestDetails extends Component {
    render() {
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>9234556761V</td>
                            <td>mark@gmail.com</td>
                            <td>0114567890</td>
                            <td>personal purpose</td>
                        </tr>
                       
                    </tbody>
                </Table>
                </div>
            </div>
        );
    }
}

export default customerRequestDetails;