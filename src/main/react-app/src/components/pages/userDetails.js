import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import axios from 'axios';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';

class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: undefined,
            userdetails: []
        };
    }

    componentDidMount() {
        document.title = 'User Details';
        const user = AuthService.getCurrentUser();


        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
        axios.get("http://localhost:8080/api/auth/users")
            .then(response => response.data)
            .then((data) => {

                console.log('view users');
                this.setState({ userdetails: data });
            });
    }

    render() {

        const { currentUser } = this.state;
        return (
            <div>
                <h2>User Details</h2>
                <div className="container mgntop">
                    <Table responsive striped bordered hover size="sm" >
                        <thead >
                            <tr style={{ color: 'white', background: '#343A40' }}>
                                <th className="ml-3">#</th>
                                <th>Name</th>
                                <th>NIC</th>
                                <th>Email</th>

                                <th>Joined</th>
                                <th  style={{textAlign:'center'}}><span>Modify</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userdetails.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">{this.state.userdetails.length} No Requests Available.</td>
                                    </tr> :
                                    this.state.userdetails.map((user, index) => (

                                        <tr key={user.id}>

                                            <td>{1 + index++}</td>
                                            <td>{user.name}</td>
                                            <td>{user.nic}</td>
                                            <td>{user.username}</td>
                                            <td>{user.date}</td>
                                            <td style={{textAlign:'center'}}>
                                                <OverlayTrigger  placement="right" overlay={<Tooltip>remove user</Tooltip>}>
                                                    <span className="d-inline-block">
                                                        <a href="/home/userdetails"><span  ><RemoveCircleSharpIcon color="disabled" type="button"
                                                            style={{ alignItems: 'right', fontSize: '25px'}} /></span></a>
                                                    </span>
                                                </OverlayTrigger>
                                            </td>
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
export default withRouter(UserDetails);