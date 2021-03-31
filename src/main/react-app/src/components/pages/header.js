import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Col,
  Form,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Dvr } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.logOut = this.logOut.bind(this);
    this.handleTheme = this.handleTheme.bind(this);

    this.state = {
      message: "",
      showAdminBoard: false,
      currentUser: undefined,
      show: false,
    };
  }
  initialState = {
    theme: "#d3d5fd",
    errors: { theme: "" },
  };
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    const userId = currentUser.id;
    console.log("id: " + currentUser.id);
    console.log("name: " + currentUser.theme);
    if (userId) {
      this.findUserById(userId);
    } else if (!currentUser) this.setState({ redirect: "./" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  findUserById = (userId) => {
    axios
      .get("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            theme: response.data.theme,
          });
        }
        if (this.state.theme == null) {
          this.setState({
            theme: "#d3d5fd",
            redirect: "/home/profile",
          });
          console.log("newt " + this.state.theme);
          console.log("new2t " + this.initialState);
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  logOut() {
    AuthService.logout();
  }

  setColor1 = (event) => {
    const theme = {
      theme: "#d3d5fd",
    };
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    axios
      .put("http://localhost:8080/api/auth/color/" + userId, theme)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      });
  };

  setColor2 = (event) => {
    const theme = {
      theme: "#0062cc",
    };
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    axios
      .put("http://localhost:8080/api/auth/color/" + userId, theme)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      });
  };

  setColor3 = (event) => {
    const theme = {
      theme: "#239d60",
    };
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    axios
      .put("http://localhost:8080/api/auth/color/" + userId, theme)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      });
  };

  setColor4 = (event) => {
    const theme = {
      theme: "#3e3e3e",
    };
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    axios
      .put("http://localhost:8080/api/auth/color/" + userId, theme)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
        } else {
          this.setState({ show: false });
        }
      });
  };

  handleTheme = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    this.setState({ errors, [name]: value });
  };

  render() {
    const { currentUser, showAdminBoard, theme } = this.state;

    const mTop = {
      marginTop: "20px",
    };

    return (
      <div>
        <div className="header">
          <Navbar
            name="theme"
            value={this.state.theme}
            style={{ background: this.state.theme, color: "red" }}
            expand="lg"
          >
            <Navbar.Brand href="/home">
              <Dvr
                fontSize="large"
                style={{ color: theme === "#d3d5fd" ? "black" : "#f1f1f1" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {currentUser && (
                  <Nav.Link href="/home/profile">
                    <span
                      style={{
                        color: theme === "#d3d5fd" ? "black" : "#f1f1f1",
                      }}
                    >
                      Profile {"   "}{" "}
                    </span>{" "}
                  </Nav.Link>
                )}

                <span>&nbsp;&nbsp;</span>
              </Nav>
              <Form className="nav-link" id="FormId" method="put">
                <ButtonGroup border="light" size="xm" style={{ border: "2px" }}>
                  <Button
                    variant="light"
                    type="submit"
                    onClick={() => this.setColor1()}
                  ></Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => this.setColor2()}
                  ></Button>
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => this.setColor3()}
                  ></Button>
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={() => this.setColor4()}
                  ></Button>
                </ButtonGroup>
              </Form>

              <a
                href="/login"
                style={{ color: theme === "#d3d5fd" ? "black" : "#f1f1f1" }}
                className="nav-link"
                onClick={this.logOut}
              >
                <span>SignOut</span>
              </a>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Col sm={6} style={mTop}></Col>
      </div>
    );
  }
}

export default withRouter(Header);
