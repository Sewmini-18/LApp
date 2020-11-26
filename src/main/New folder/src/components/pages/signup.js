import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import { Row, Col } from 'react-bootstrap';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import './css/style.css'
import { Person, Lock, Email, AccountBoxRounded, VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';




const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validNic = RegExp(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/);
const validPassword = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default class Signin extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.handleChange = this.handleChange.bind(this);


    this.state = {
      name: "",

      nic: "",
      username: "",
      password: "",
      successful: false,
      message: "",
      isPasswordShown: false,
      errors: {
        name: '',
        username: '',
        nic: '',
        password: '',
        req: '',
      }
    };
  }

  componentDidMount() {
    document.title = "Register"
  }


  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'req':
        errors.req =
          value.length = 0
            ? 'required long!'
            : ' long!';
        break;
      case 'name':
        errors.name =
          value.length < 5
            ? 'Name must be 5 characters long!'
            : '';
        break;
      case 'username':
        errors.username =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'nic':
        errors.nic =
          validNic.test(value)
            ? ''
            : 'NIC is not valid!';
        break;
      case 'password':
        errors.password =
          validPassword.test(value)
            ? ''
            : 'Invalid password!';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });



    if (validateForm(this.state.errors)) {
      AuthService.register(
        this.state.name,
        this.state.username,
        this.state.nic,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    const { errors, isPasswordShown } = this.state;

    return (

      <div >
        <div className="Wrapper">
          <div className="inner">
            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}>
              <h3>REGISTER</h3><br />

              {!this.state.successful && (
                <div>
                  <div>{errors.name.length > 0 &&
                    <span className='error'>{errors.name}</span>}</div>
                  <div className="form-holder active"><span className="icon"><Person /></span>
                    <input placeholder="Full Name" autoComplete="off"
                      type='text'
                      className='form-control'
                      name='name'
                      value={this.state.name}
                      onChange={this.handleChange}
                      noValidate
                    />

                  </div>

                  <div>{errors.username.length > 0 &&
                    <span className='error'>{errors.username}</span>}</div>

                  <div className="form-holder"><span className="icon"><Email /></span>
                    <input placeholder="e-mail" autoComplete="off"
                      type='email'
                      className='form-control'
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      noValidate
                    />

                  </div>

                  <div>{errors.nic.length > 0 &&
                    <span className='error'>{errors.nic}</span>}</div>
                  <div className="form-holder "><span className="icon"><AccountBoxRounded /></span>
                    <input placeholder="NIC" autoComplete="off"
                      type='text'
                      className='form-control'
                      name="nic"
                      value={this.state.nic}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div>{errors.password.length > 0 &&
                    <span className='error'>{errors.password}</span>}</div>
                  <div className="form-holder "><span className="icon"><Lock /></span>
                    <input className="form-control" type={(isPasswordShown) ? "text" : "password"} placeholder="password"

                      name='password'
                      value={this.state.password}
                      onChange={this.handleChange}

                    />
                    <div className="eye-reg" title={isPasswordShown ? "hide password" : "show password"}>
                      {isPasswordShown ? <VisibilityOffOutlined title="hide" type="button" onClick={this.togglePasswordVisibility} />
                        : <VisibilityOutlined title="show" type="button" onClick={this.togglePasswordVisibility} />}

                    </div>
                  </div>

                  <div >
                    <Row className="text-center">
                      <Col>&nbsp; I agree all statement in <a className="alink" href="/">Terms & Conditions</a>
                        <br /><br /><br /></Col>
                    </Row>
                  </div>

                  <div className="form-login">
                    <Row>
                      <Col className="text-right" xs={6} >
                        <button className="btn abutton ">REGISTER</button>
                      </Col>

                      <Col className="text-center"><p>&nbsp;Already have an account?
                    <a className="alink " href="/login"> Login</a></p></Col>
                    </Row>
                  </div>
                </div>
              )}



              {this.state.message && (
                <div className="form-group"><br />
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                    {this.state.successful ? <a href="/login"><br />Login</a>
                      : <span>{" "}</span>}

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

