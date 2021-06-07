import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Row, Col, Image} from "react-bootstrap";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import "../../components/pages/css/style.css";
import CompanyLogo from "../../components/pages/images/1131.jpg";
import { Email } from "@material-ui/icons";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      errors: {
        username: "",
      },
    };
  }

  componentDidMount() {
    document.title = "Forgot Password";
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleForgotPassword = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    if (validateForm(this.state.errors)) {
      let username = this.state.username.toLowerCase();
      AuthService.resetPassword(username).then(
        (response) => {
          this.setState({
            message: response.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response && error.response.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  };

  render() {
    // de-structure
    const { errors, username, successful, message } = this.state;

    return (
      <div>
        <div className="Wrapper">
        <Image src={CompanyLogo} width={300} style={{marginLeft: "15%"}}/>
          <div className="inner">
            <Form
              onSubmit={this.handleForgotPassword}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h3>FORGOT PASSWORD</h3>
              <br />

              {!successful && (
                <div>
                  <div className="form-holder">
                    <span className="icon">
                      <Email />
                    </span>
                    <input
                      placeholder="e-mail"
                      autoComplete="off"
                      type="email"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      noValidate
                    />
                  </div>
                  <div>
                    {errors.username.length > 0 && (
                      <span className="error">{errors.username}</span>
                    )}
                  </div>

                  <div>
                    <Row className="text-center">
                      <Col>
                        &nbsp; I agree all statement in{" "}
                        <a className="alink" href="/">
                          Terms & Conditions
                        </a>
                        <br />
                        <br />
                        <br />
                      </Col>
                    </Row>
                  </div>

                  <div className="form-login">
                    <Row>
                      <Col className="text-right" xs={6}>
                        <button className="btn abutton ">SUBMIT</button>
                      </Col>

                      <Col className="text-center">
                        <p>
                          &nbsp;Already have an account?
                          <a className="alink " href="/login">
                            {" "}
                            Login
                          </a>
                          <a className="alink " href="/register">
                            {" "}
                            Register
                          </a>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <br />
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                    {successful ? (
                      <a href="/login">
                        <br />
                        Login
                      </a>
                    ) : (
                      <span> </span>
                    )}
                  </div>
                </div>
              )}

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
