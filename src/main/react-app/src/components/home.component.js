import React, { Component } from "react";
import { Row, Button, Col, Container, Card, CardDeck } from "react-bootstrap";
import AuthService from "../services/auth.service";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  initialState = {
    theme: "#d3d5fd",
    errors: { theme: "" },
  };

  componentDidMount() {
    document.title = "Home";
    const currentUser = AuthService.getCurrentUser();
    console.log("theme:-" + currentUser.theme);

    const userId = currentUser.id;
    if (userId) {
      this.findUserById(userId);
      this.setState({
        currentUser: currentUser,
        showAdminBoard: currentUser.roles.includes("ROLE_ADMIN"),
        theme: this.state.theme,
      });
    }
  }

  findUserById = (userId) => {
    axios
      .get("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            theme: response.data.theme,
          });
          console.log("theme2:-" + this.state.theme);

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
          this.setState({ theme: themec });
          console.log("new color:- " + themec);
        }
        if (this.state.theme == null) {
          this.setState({
            theme: "#d3d5fd",
          });
          let themec = this.state.theme;
          themec = "secondary";
          console.log("new color null:- " + themec);
          this.setState({ theme: themec });
          console.log("new " + this.state.theme);
          console.log("new2 " + this.initialState.theme);
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  render() {
    const { currentUser, showAdminBoard, theme } = this.state;
    const mTop = {
      marginTop: "40px",
      border: "2px",
    };

    return (
      <div className="container" style={mTop}>
        <Container>
          <Row>
            <Col>
              <Container>
                <CardDeck>
                  {" "}
                  {currentUser && (
                    <Card
                      border={theme}
                      style={{
                        border: "1px",
                        borderStyle: "solid",
                        width: "18rem",
                      }}
                    >
                      <Card.Body>
                        <Card.Title> View Logs </Card.Title> <br />
                        <Card.Text>
                          You can sort and view log files.{" "}
                        </Card.Text>{" "}
                        <br />
                        <Button href="/home/folder" variant={theme}>
                          {" "}
                          View log files.{" "}
                        </Button>
                      </Card.Body>
                    </Card>
                  )}{" "}
                  {currentUser && (
                    <Card
                      border={theme}
                      style={{
                        border: "1px",
                        borderStyle: "solid",
                        width: "18rem",
                      }}
                    >
                      <Card.Body>
                        <Card.Title> Logs Visualization </Card.Title> <br />
                        <Card.Text>
                          Analyze and view logs using charts{" "}
                        </Card.Text>{" "}
                        <br />
                        <Button href="home/chart" variant={theme}>
                          {" "}
                          Logs visualization{" "}
                        </Button>
                      </Card.Body>
                    </Card>
                  )}{" "}
                  {showAdminBoard && (
                    <Card
                      border={theme}
                      style={{
                        border: "1px",
                        borderStyle: "solid",
                        width: "18rem",
                      }}
                    >
                      <Card.Body>
                        <Card.Title> Export Log Files </Card.Title> <br />
                        <Card.Text>
                          Logs printing or export to extranal{" "}
                        </Card.Text>{" "}
                        <br />
                        <Button href="/home" variant={theme}>
                          {" "}
                          Export log files{" "}
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </CardDeck>{" "}
              </Container>{" "}
            </Col>{" "}
          </Row>{" "}
          <br />
          <br />
          <Row>
            <Container>
              <CardDeck>
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> Backup Log Files </Card.Title> <br />
                      <Card.Text>Logs manually backup </Card.Text> <br /> <br />
                      <Button href="/home" variant={theme}>
                        {" "}
                        Backup log files{" "}
                      </Button>{" "}
                    </Card.Body>
                  </Card>
                )}{" "}
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> Logs Predictions Identification </Card.Title>{" "}
                      <br />
                      <Card.Text>
                        View predictions using log files{" "}
                      </Card.Text>{" "}
                      <br />
                      <Button href="/home/plot" variant={theme}>
                        {" "}
                        View predicted plot{" "}
                      </Button>
                    </Card.Body>
                  </Card>
                )}
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> Customer Request Form </Card.Title> <br />
                      <Card.Text>
                        Collect customer requests details{" "}
                      </Card.Text>{" "}
                      <br /> <br />
                      <Button href="/home/customerform" variant={theme}>
                        {" "}
                        Request Form{" "}
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </CardDeck>{" "}
            </Container>{" "}
          </Row>{" "}
          <br /> <br />
          <Row>
            <Container>
              <CardDeck>
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> Customer Request Details </Card.Title> <br />
                      <Card.Text>View customer request details </Card.Text>{" "}
                      <br /> <br />
                      <Button href="home/request" variant={theme}>
                        {" "}
                        view request details{" "}
                      </Button>{" "}
                    </Card.Body>
                  </Card>
                )}
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> User Management </Card.Title>
                      <br />
                      <Card.Text>
                        {" "}
                        View users details and manage users{" "}
                      </Card.Text>
                      <br /> <br />
                      <Button href="home/userdetails" variant={theme}>
                        {" "}
                        view users{" "}
                      </Button>{" "}
                    </Card.Body>{" "}
                  </Card>
                )}{" "}
                {showAdminBoard && (
                  <Card
                    border={theme}
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      width: "18rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Title> View User Login History </Card.Title> <br />
                      <Card.Text>
                        You can view user login history.{" "}
                      </Card.Text>{" "}
                      <br /> <br />
                      <Button href="/home/user_history" variant={theme}>
                        {" "}
                        View Login History{" "}
                      </Button>
                    </Card.Body>
                  </Card>
                )}{" "}
              </CardDeck>{" "}
            </Container>{" "}
          </Row>{" "}
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);
