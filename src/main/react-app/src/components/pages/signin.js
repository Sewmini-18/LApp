import React, { Component } from 'react';
import Form from "react-validation/build/form";
import './css/style.css';
import { Row, Col } from 'react-bootstrap';
import { LockOpen, MailOutline, VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import CheckButton from "react-validation/build/button";
import AuthService from '../../services/auth.service';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.userChange = this.userChange.bind(this);


    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      isPasswordShown: false
    };
  }

  componentDidMount() {
    document.title = "Login"
  }

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  }
  userChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      let username = this.state.username.toLowerCase();
      AuthService.login(username, this.state.password).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {

    const { username, password, isPasswordShown } = this.state;
    return (

      <div >
        <div className="Wrapper">
          <div className="inner">
            <Form className="login"
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <h3>LOGIN</h3><br />

              <div className="form-holder "><span className="icon"><MailOutline /></span>
                <input className="form-control" type="email" placeholder="e-mail"
                  name="username" value={username} onChange={this.userChange} /></div>

              <div className="form-holder "><span className="icon"><LockOpen /></span>
                <input className="form-control" placeholder="password" name="password" value={password}
                  type={(isPasswordShown) ? "text" : "password"} onChange={this.userChange} />
                <div className="eye" title={isPasswordShown ? "hide password" : "show password"}>
                  {isPasswordShown ? <VisibilityOffOutlined title="hide" type="button" onClick={this.togglePasswordVisibility} />
                    : <VisibilityOutlined title="show" type="button" onClick={this.togglePasswordVisibility} />}

                </div>
              </div>

              <div> <br />
                {/*  
                <Row>
                  <Col>
                    <div className="text-right"><a href="/">forget password? </a> &nbsp;&nbsp;</div><br />
                  </Col>
                </Row>
              */}
              </div>
              <div className="form-login">
                <Row>
                 
                  <Col className="text-right" xs={6}>
                    <div className="form-group"> <br />
                      <button
                        className="btn abutton"
                        disabled={this.state.username.length === 0 || this.state.password === 0}
                      >

                        <span>Login</span>
                      </button>
                    </div>

                  </Col>
                  <Col className="text-center"><p> <br/> &nbsp;You don't have an account?
                    <a className="alink " href="/register"> Register</a></p></Col>
                </Row>
              </div>

              {this.state.message && (
                <div className="form-group"><br />
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div >
    )
  }

}

export default (Signup);