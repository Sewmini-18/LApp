import React, { Component } from "react";
import "./css/customerFormStyle.css";
import { Row, Jumbotron, Form, Button } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import BackImage from "./images/114.jpg";


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validNic = RegExp(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/);


class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.intialState;
    this.custChange = this.custChange.bind(this);
    this.submitCustomer = this.submitCustomer.bind(this);
  }

  intialState = {
    cname: "",
    successful: false,
    message: "",
    cemail: "",
    cphone: "",
    creason: "",
    cnic: "",
    alert: "",
    errors: {
      cname: "",
      cemail: "",
      cphone: "",
      cnic: "",
      creason: "",
    },
  };

  componentDidMount() {
    document.title = "Customer Form";
    document.body.style.backgroundImage = `url(${ BackImage })`;
    document.body.style.backgroundRepeat = `no-repeat`;
    document.body.style.backgroundSize = "100%";
    document.body.style.opacity ="80%";
  }

  submitCustomer = (event) => {
    event.preventDefault();

    let cemail = this.state.cemail.toLowerCase();
    let date = new Date().toLocaleString() + "";

    const customerReq = {
      c_name: this.state.cname,
      email: cemail,
      phone: this.state.cphone,
      reason: this.state.creason,
      c_nic: this.state.cnic,
      date: date,
    };

    axios
      .post("http://localhost:8080/api/auth/customer", customerReq)
      .then((response) => {
        if (response.data != null) {
          this.setState({ message: "success", successful: true });
          setTimeout(() => this.setState({ message: "" }), 3000);
          setTimeout(() => this.setState(this.intialState), 2000);
          console.log("Succesfully added");
        }
        //this.setState(this.intialState);
      })
      .catch((error) => {
        this.setState({ message: "error" });
        setTimeout(() => this.setState({ message: "" }), 3000);
      });
  };

  custChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "cname":
        errors.cname =
          value.length < 5 ? "Name must be at least 5 characters long!" : "";
        break;
      case "cemail":
        errors.cemail = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "cnic":
        errors.cnic = validNic.test(value) ? "" : "NIC is not valid!";
        break;
      case "cphone":
        errors.cphone =
          value.length < 10 ? "Phone Number must be 10 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  render() {
    const { cname, cemail, cnic, cphone, creason, errors } = this.state;

    return (
      <div>
        <div className="container mgntop">
          <h4 style={{ textAlign: "center" }}> Request Details </h4>
          <Row>
            <div className="wrapper p-b-45">
              <div style={{ textAlign: "right" }}>
                <Tooltip title="Request Details" placement="top">
                  <IconButton
                    href="/home/request"
                    aria-label="delete"
                    ontSize="small"
                  >
                  
                    <ListAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>

              <Form onSubmit={this.submitCustomer}>
                <Jumbotron style={{ width: "60rem" }}>
                  <div>
                    <div>
                      <div className="card card-5">
                        <div className="card-heading">
                          <h4 className="title">
                            Customer Requst Details Collecting Form
                          </h4>
                          <br />
                        </div>
                        <div className="card-body">
                          <form id="customerForm">
                            <div className="form-row">
                              <div className="name"> Customer Name </div>
                              <div className="value">
                                <div>
                                  {errors.cname.length > 0 && (
                                    <span className="error-form">
                                      {errors.cname}
                                    </span>
                                  )}
                                </div>
                                <div className="input-group">
                                  <input
                                    className="input--style-5"
                                    placeholder="Name here"
                                    type="text"
                                    id="name"
                                    name="cname"
                                    value={cname}
                                    autoComplete="off"
                                    onChange={this.custChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="name"> NIC No </div>
                              <div className="value">
                                {errors.cnic.length > 0 && (
                                  <span className="error-form">
                                    {errors.cnic}
                                  </span>
                                )}
                                <div className="input-group">
                                  <input
                                    className="input--style-5"
                                    type="text"
                                    value={cnic}
                                    name="cnic"
                                    placeholder="NIC Number "
                                    autoComplete="off"
                                    onChange={this.custChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="name"> Email </div>
                              <div className="value">
                                {errors.cemail.length > 0 && (
                                  <span className="error-form">
                                    {errors.cemail}
                                  </span>
                                )}
                                <div className="input-group">
                                  <input
                                    className="input--style-5"
                                    type="email"
                                    value={cemail}
                                    name="cemail"
                                    placeholder="Email here"
                                    autoComplete="off"
                                    onChange={this.custChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="name"> Contact Number </div>
                              <div className="value">
                                {errors.cphone.length > 0 && (
                                  <span className="error-form">
                                    {errors.cphone}
                                  </span>
                                )}
                                <div className="input-group">
                                  <input
                                    className="input--style-5"
                                    type="text"
                                    value={cphone}
                                    name="cphone"
                                    placeholder="Contact No here"
                                    onChange={this.custChange}
                                    autoComplete="off"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="name"> Reason / Request </div>
                              <div className="value">
                                <div className="input-group">
                                  <input
                                    className="input--style-5"
                                    type="text"
                                    value={creason}
                                    placeholder="Reason for request"
                                    name="creason"
                                    autoComplete="off"
                                    onChange={this.custChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <Button type="submit" variant="warning">
                                {" "}
                                Submit{" "}
                              </Button>
                            </div>
                            <br />
                            <br />
                            <div style={{ alignItems: "center" }}>
                              <br /> &nbsp;&nbsp;{" "}
                            </div>
                            {this.state.message === "error" ? (
                              <div className="alert alert-danger" role="alert">
                                Please provide valid information!
                              </div>
                            ) : null}
                            {this.state.message === "success" ? (
                              <div className="alert alert-success" role="alert">
                                Successfully added a new customer request
                              </div>
                            ) : null}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Jumbotron>
              </Form>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
