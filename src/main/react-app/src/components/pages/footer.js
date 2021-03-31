import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { Navbar, Col } from "react-bootstrap";
import axios from "axios";
import AuthService from "../../services/auth.service";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: "#d3d5fd" };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    const userId = currentUser.id;
    if (userId) {
      this.findUserById(userId);
    }
    this.setState({ currentUser: currentUser });
  }

  findUserById = (userId) => {
    axios
      .get("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            theme: response.data.theme,
          });
          //console.log("footer color "+this.state.theme);
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };
  render() {
    const mTop = {
      marginTop: "100px",
    };
    const { theme } = this.state;

    return (
      <div className="footer" fixed="bottom" style={{ position: "bottom" }}>
        <Col sm={6} style={mTop}>
          {" "}
        </Col>{" "}
        <Navbar fixed="bottom" style={{ background: theme }}>
          <Container style={{ background: theme }}>
            <Col
              className="text-center"
              style={{ color: theme === "#d3d5fd" ? "#666666" : "#cccccc" }}
            >
              <div> All rights reserved </div>{" "}
            </Col>{" "}
          </Container>{" "}
        </Navbar>{" "}
      </div>
    );
  }
}
