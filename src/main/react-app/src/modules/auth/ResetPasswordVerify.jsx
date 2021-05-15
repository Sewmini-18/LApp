import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Row, Col } from "react-bootstrap";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import "../../components/pages/css/style.css";
import {
  Lock,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";

const validPassword = RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class ResetPasswordVerify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nic: "",
      username: "",
      password: "",
      successful: false,
      message: "",
      isPasswordShown: false,
      isConfirmPasswordShown: false,
      errors: {
        password: "",
        confirmPassword: "",
      },
    };
  }

  componentDidMount() {
    document.title = "Reset Password";
    const email = new URLSearchParams(this.props.location.search).get("email");
    const token = new URLSearchParams(this.props.location.search).get("token");

    console.log("ResetPasswordVerify : email : ", email);
    console.log("ResetPasswordVerify : token : ", token);

    this.setState({
      email,
      token,
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    console.log("password :  ", this.state.password);
    console.log("value :  ", value);
    console.log(
      "this.state.password != value :  ",
      this.state.password != value
    );

    // debugger;
    switch (name) {
      case "password":
        errors.password = validPassword.test(value) ? "" : "Invalid password!";
        break;
      case "confirmPassword":
        if (this.state.password != value) {
          errors.confirmPassword = "Password Mismatch!";
        } else {
          errors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  toggleConfirmPasswordVisibility = () => {
    const { isConfirmPasswordShown } = this.state;
    this.setState({ isConfirmPasswordShown: !isConfirmPasswordShown });
  };

  handleForgotPasswordVerify = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    if (validateForm(this.state.errors)) {
      let username = this.state.email.toLowerCase();
      AuthService.resetPasswordVerify(
        username,
        this.state.token,
        this.state.password
      ).then(
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
    const { errors, isPasswordShown, isConfirmPasswordShown } = this.state;

    return (
      <div>
        <div className="Wrapper">
          <div className="inner">
            <Form
              onSubmit={this.handleForgotPasswordVerify}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h3>RESET PASSWORD</h3>
              <br />

              {!this.state.successful && (
                <div>
                  <div className="form-holder ">
                    <span className="icon">
                      <Lock />
                    </span>
                    <input
                      className="form-control"
                      type={isPasswordShown ? "text" : "password"}
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <div
                      className="eye-reg"
                      title={
                        isPasswordShown ? "hide password" : "show password"
                      }
                    >
                      {isPasswordShown ? (
                        <VisibilityOffOutlined
                          title="hide"
                          type="button"
                          onClick={this.togglePasswordVisibility}
                        />
                      ) : (
                        <VisibilityOutlined
                          title="show"
                          type="button"
                          onClick={this.togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    {errors.password.length > 0 && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>

                  <div className="form-holder ">
                    <span className="icon">
                      <Lock />
                    </span>
                    <input
                      className="form-control"
                      type={isConfirmPasswordShown ? "text" : "password"}
                      placeholder="confirm password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                    <div
                      className="eye-reg"
                      title={
                        isPasswordShown ? "hide password" : "show password"
                      }
                    >
                      {isPasswordShown ? (
                        <VisibilityOffOutlined
                          title="hide"
                          type="button"
                          onClick={this.toggleConfirmPasswordVisibility}
                        />
                      ) : (
                        <VisibilityOutlined
                          title="show"
                          type="button"
                          onClick={this.toggleConfirmPasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    {errors.confirmPassword.length > 0 && (
                      <span className="error">{errors.confirmPassword}</span>
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
                          <a className="alink " href="/forgot-password">
                            {" "}
                            Forgot Password
                          </a>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <br />
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                    {this.state.successful ? (
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
