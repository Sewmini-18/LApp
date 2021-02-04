import React, { Component } from 'react';
import './css/customerFormStyle.css';
import { Button, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { Row, Jumbotron } from 'react-bootstrap'

import ActionAlerts from '../alert'
import axios from 'axios';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#ff4b5a',
        borderRadius: '25px 25px',
        // marginLeft: '15px',
        width: '150px',
        height: '40px',

        '&:hover': {
            backgroundColor: '#eb3746',
        },
        '&:disabled': {
            backgroundColor: '#d66a73',
            opacity: 0.7,
            color: 'white',
        }
    },
}))(Button);


class CustomerForm extends Component {


    constructor(props) {
        super(props);
        this.state = this.intialState;
        this.custChange = this.custChange.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);

    }

    intialState = { cname: '', cemail: '', cphone: '', creason: '', cnic: '', alert: '' };

    componentDidMount() {
        document.title = "Form"
    }

    submitCustomer = event => {
        //alert(this.state.password);
        event.preventDefault();
        console.log(this.state);
        let cemail = this.state.cemail.toLowerCase();
        let curTime = new Date().toLocaleString();

        const customerReq = {
            c_name: this.state.cname,
            email: cemail,
            phone: this.state.cphone,
            reason: this.state.creason,
            c_nic:this.state.cnic,
            //curTime: curTime

        }

        axios.post("http://localhost:8080/api/auth/customer", customerReq)
            .then(response => {
                if (response.data != null) {


                    this.setState({ alert: 'success' });
                    setTimeout(() => this.setState({ alert: '' }), 2000);
                    console.log("Succesfully added");
                }
            }).catch(error => {
                this.setState({ alert: 'error' });
                console.log("Bad crediential");
            });
        this.setState(this.intialState);

    }

    custChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        const { cname, cemail, cnic, cphone, creason, alert } = this.state;


        return (
            <div >
                <div className="container mgntop">
                    <h2>Add Customer Request</h2>
                    <Row >
                        <div className="wrapper p-b-45">
                            <Jumbotron style={{ width: '56rem' }}>
                                <div>
                                    <div >
                                        <div className="card card-5">
                                            <div className="card-heading">
                                                <h2 className="title">Customer Details Collection Form :</h2><br/>
                                            </div>
                                            <div className="card-body">
                                                <form id="customerForm" >
                                                    <div className="form-row">
                                                        <div className="name">Customer Name</div>
                                                        <div className="value">
                                                            <div className="input-group">
                                                                <input className="input--style-5" placeholder="Name here" type="text" id="name" name="cname" value={cname} minLength="5" onChange={this.custChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="name">NIC No</div>
                                                        <div className="value">
                                                            <div className="input-group">
                                                                <input className="input--style-5" type="text" value={cnic} name="cnic" placeholder="NIC Number " onChange={this.custChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="name">Email</div>
                                                        <div className="value">
                                                            <div className="input-group">
                                                                <input className="input--style-5" type="email" value={cemail} name="cemail" placeholder="Email here" onChange={this.custChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="name">Contact Number</div>
                                                        <div className="value">
                                                            <div className="input-group">
                                                                <input className="input--style-5" type="text" value={cphone} name="cphone" placeholder="Contact No here" onChange={this.custChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-row">
                                                        <div className="name">Reason / Request</div>
                                                        <div className="value">
                                                            <div className="input-group">
                                                                <input className="input--style-5" type="text" value={creason} placeholder="Reason for request" name="creason" onChange={this.custChange} required />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <ColorButton type="submit" onClick={this.submitCustomer} variant="contained" className="abutton"> Submit </ColorButton>
                                                    </div><br />
                                                    <div ><br />
                                                        {this.state.alert === "error" ? <ActionAlerts name="alert" value={alert}
                                                            children={{ severity: "error", message: "Something went wrong" }} /> : null}
                                                        {this.state.alert === "success" ? <ActionAlerts name="alert" value={alert}
                                                            children={{ severity: "success", message: "Successfully added Request.." }} /> : null}&nbsp;&nbsp;
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Jumbotron>
                        </div>

                    </Row>
                </div>
            </div>
        );
    }
}

export default (CustomerForm);