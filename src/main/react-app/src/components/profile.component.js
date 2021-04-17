import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./pages/css/profile.css";
import { Figure, Card, Button } from "react-bootstrap";
import userPic from "./pages/images/user.png";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      theme: "#d3d5fd",
      userReady: false,
      loading: false,
      name: "",
      phone: "",
      role: "",
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    document.title = "Profile";
    const currentUser = AuthService.getCurrentUser();
    console.log("id: " + currentUser.id);
    const userId = currentUser.id;
    console.log("name: " + currentUser.name);
    if (userId) {
      this.findUserById(userId);
    } else if (!currentUser) this.setState({ redirect: "./" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      name: this.state.name,
    });
  }

  findUserById = (userId) => {
    axios
      .get("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            username: response.data.username,
            nic: response.data.nic,
            phone: response.data.phone,
            theme: response.data.theme,
          });
          let themec = this.state.theme;
          switch (themec) {
            case "#d3d5fd":
              themec = "outline-dark";
              break;
            case "#0062cc":
              themec = "primary";
              break;
            case "#239d60":
              themec = "success";
              break;
            case "#3e3e3e":
              themec = "dark";
              break;
            default:
              break;
          }
          this.setState({ theme: themec, loading: true });
          console.log("new color:- " + themec);
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
        this.setState({ redirect: "/home" });
      });
    console.log("Hi Hi2 " + this.setState.name + " ll");
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser, theme } = this.state;

    return (
      <div>
        {this.state.loading ? (
          <div className="container">
            {this.state.userReady ? (
              <div>
                <div className="page-content container" id="page-content">
                  <div className="">
                    <div className="row container">
                      <div className="col-xl-12 col-md-12">
                        <div className="row m-l-0 m-r-0">
                          <div className="col-sm-4 bg-c-lite-green user-profile">
                            <div
                              style={{ color: "black" }}
                              className="card-block text-center "
                            >
                              <div className="m-b-25">
                                <Figure>
                                  <Figure.Image
                                    width={120}
                                    height={120}
                                    alt="120x120"
                                    src={userPic}
                                  />
                                  <Figure.Caption>
                                    Profile Picture
                                  </Figure.Caption>
                                </Figure>
                              </div>
                              <h4 className="f-w-600 name-style">{this.state.name}</h4>
                              <br />
                            
                              {currentUser.roles.includes("ROLE_ADMIN") ? (
                                <p>Admin</p>
                              ) : (
                                <p>
                                  User <br />
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="card-block-right">
                              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                Basic Information
                              </h6>
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="m-b-10 f-w-600">Name</p>
                                  <h6 className="text-muted f-w-400">
                                    {this.state.name}
                                  </h6>
                                  <br />
                                  <br />
                                </div>
                                <div className="col-sm-6">
                                  <p className="m-b-10 f-w-600">NIC Number</p>
                                  <h6 className="text-muted f-w-400">
                                    {currentUser.nic}
                                  </h6>
                                </div>
                              </div>
                              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                Contact Information
                              </h6>
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="m-b-10 f-w-600">Email</p>
                                  <h6 className="text-muted f-w-400">
                                    {this.state.username}
                                  </h6>
                                </div>
                                <div className="col-sm-6 m-b-10">
                                  <p className="m-b-10 f-w-600">Telephone</p>
                                  <h6 className="text-muted f-w-400">
                                    {this.state.phone}
                                  </h6>
                                  <br />
                                  <br />
                                </div>
                              </div>
                              <div className="row m-t-button m-l-5">
                                <Button
                                  href={"edit/userId=?" + currentUser.id}
                                  variant={theme}
                                >
                                  Edit Profile
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: "20%" }}>
            <HashLoader color={"#292b2c"} loading={true} size={150} />
          </div>
        )}
      </div>
    );
  }
}
