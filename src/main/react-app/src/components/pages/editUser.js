import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from '../../services/auth.service';
import '../pages/css/profile.css'
import { Figure, InputGroup, FormControl, Button,ButtonGroup, Form } from 'react-bootstrap'
import userPic from '../pages/images/user.png'
import axios from "axios";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.handleProfile = this.handleProfile.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    initialState = {
        redirect: null,
        userReady: false,
        message: "",
        username: '',
        name: '',
        nic: '',
        id: '',
        currentUser: { id: '' },
        errors: {
            name: '',
            username: '',
            nic: '',
            req: '',
        }

    };

    resetUser = () => {
        this.setState(() => this.initialState);
        //return this.props.history.push("/home/profile/edit/userId=?"+this.state.id);
    }

    componentDidMount() {
        document.title = 'Edit Profile';
        const currentUser = AuthService.getCurrentUser();
        const userId = currentUser.id;
        console.log("id: " + currentUser.id);
        console.log("name: " + currentUser.username);
        if (userId) {
            this.findUserById(userId);
        }
        else if (!currentUser) this.setState({ redirect: './' });
        this.setState({ currentUser: currentUser, userReady: true });


    }

    findUserById = (userId) => {
        axios.get("http://localhost:8080/api/auth/" + userId).then(response => {
            if (response.data != null) {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    username: response.data.username,
                    nic: response.data.nic,
                    
                });
                console.log("Hi Hi " + this.state.name + " ll");
            }
        }).catch((error) => {
            console.error("Error - " + error);
            this.setState({ redirect: '/home' });
        });
        console.log("Hi Hi " + this.state.name + " ll");
    }

    updateUser = event => {
        event.preventDefault();
        console.log("Button clicked");

        this.setState({
            message: "",
            successful: false
        });

        if (validateForm(this.state.errors)) {
            AuthService.update(
                this.state.username,
                this.state.name,
                this.state.nic,
                

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
        this.setState(this.initialState);
        console.log("name: " + this.state.name);
        //console.log("username: " +currentUser.username);
        setTimeout(() => this.profile(), 3000);
    }

    setColor1 = color => {
        this.setState({ heading: "brown", background: "#f1f1f1", color: "red" });
      };

    profile = () => {
        return this.props.history.push("/home/profile");
    };


    handleProfile = event => {
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
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser, name, errors } = this.state;
        return (
            <div className="container">
                {(this.state.userReady) ?
                    <div>
                        <Form onSubmit={this.updateUser} id="FormId">

                            <div>

                                <div className="page-content container" id="page-content">
                                    <div className="">
                                        <div className="row container">
                                            <div className="col-xl-12 col-md-12">
                                                <div className="row m-l-0 m-r-0">
                                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                                        <div className="card-block text-center text-white">
                                                            <div className="m-b-25"><Figure>
                                                                <Figure.Image
                                                                    width={120}
                                                                    height={120}
                                                                    alt="120x120"
                                                                    src={userPic}
                                                                />
                                                                <Figure.Caption>
                                                                    Change Profile Picture
                                                                </Figure.Caption>
                                                            </Figure></div>
                                                            <h4 className="f-w-600 name-style">{this.state.name}</h4>

                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="card-block-right">
                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600 ">Basic Information</h6>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Name</p>
                                                                    <div>
                                                                        <InputGroup size="sm" className="mb-3" >
                                                                            <FormControl aria-label="Small" type='text' name='name' value={name} onChange={this.handleProfile} aria-describedby="inputGroup-sizing-sm" autoComplete="no" />
                                                                        </InputGroup>
                                                                    </div>
                                                                    <div>{errors.name.length > 0 &&
                                                                        <span className='errorEdit'>{errors.name}</span>}</div>
                                                                    <br /><br />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">NIC Number</p>
                                                                    <div>
                                                                        <InputGroup size="sm" className="mb-3" controlid="formGridnic">
                                                                            <FormControl aria-label="Small" value={this.state.nic} aria-describedby="inputGroup-sizing-sm" />
                                                                        </InputGroup>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Contact Information</h6>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Email</p>
                                                                    <div>
                                                                        <InputGroup size="sm" className="mb-3" controlid="formGridemail">
                                                                            <FormControl aria-label="Small" name='username' value={this.state.username} onChange={this.handleProfile} aria-describedby="inputGroup-sizing-sm" />
                                                                        </InputGroup>
                                                                    </div>
                                                                    <div>{errors.username.length > 0 &&
                                                                        <span className='errorEdit'>{errors.username}</span>}</div>
                                                                </div>
                                                                <div className="col-sm-6 m-b-10">
                                                                    <p className="m-b-10 f-w-600">Telephone</p>
                                                                    <div>
                                                                        <InputGroup size="sm" className="mb-3">
                                                                            <FormControl aria-label="Small"  aria-describedby="inputGroup-sizing-sm" />
                                                                        </InputGroup>
                                                                    </div>
                                                                  
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row mt-3 m-l-5">
                                                            <Button variant="primary" type="submit" className="ml-3"  >Update</Button>
                                                            <Button className="ml-3" href="../profile" variant="danger">Cancel</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Form>
                    </div>
                    : null}
            </div>
        );
    }
}
