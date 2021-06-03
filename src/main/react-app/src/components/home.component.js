import React, {Component} from "react";
import {Row, Button, Col, Container, Card, CardDeck} from "react-bootstrap";
import AuthService from "../services/auth.service";
import axios from "axios";
import {withRouter} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      loading: false,
      showRegUserBoard: false,
    };
  }

  initialState = {
    theme: "#d3d5fd",
    errors: {theme: ""},
  };

  componentDidMount() {
    document.title = "Home";
    const currentUser = AuthService.getCurrentUser();

    const userId = currentUser.id;
    if (userId) {
      this.findUserById(userId);
      this.setState({
        currentUser: currentUser,
        showAdminBoard: currentUser.roles.includes("ROLE_ADMIN"),
        showRegUserBoard: currentUser.roles.includes("ROLE_USER"),
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
            this.setState({theme: themec, loading: true});
          }
        })
        .catch((error) => {
          console.error("Error - " + error);
        });
  };

  render() {
    const {currentUser, showAdminBoard, theme, showRegUserBoard} = this.state;

    const mTop = {
      marginTop: "40px",
      border: "2px",
    };

    return (
        <div className="container" style={mTop}>
          {this.state.loading ? (
              <Container>
                <Row>
                  <Col>
                    <Container>
                      <CardDeck>
                        {showRegUserBoard && (
                            <Card
                                border={theme}
                                style={{
                                  border: "1px",
                                  borderStyle: "solid",
                                  width: "18rem",
                                }}
                            >
                              <Card.Body>
                                <Card.Title>View Logs</Card.Title>
                                <br/>
                                <Card.Text>
                                  You can sort and view log files.{" "}
                                </Card.Text>
                                <br/>
                                <Button href="/home/folder" variant={theme}>
                                  View log files{" "}
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
                                <Card.Title>View and Export Logs</Card.Title>
                                <br/>
                                <Card.Text>
                                  You can sort, view and export log files.{" "}
                                </Card.Text>
                                <br/>
                                <Button href="/home/folder" variant={theme}>
                                  View / Export log files{" "}
                                </Button>
                              </Card.Body>
                            </Card>
                        )}
                        {currentUser && (
                            <Card
                                bg={theme === "outline-dark" ? "light" : theme}
                                border="outline-dark"
                                style={{
                                  color: theme === "outline-dark" ? "black" : "#f1f1f1",
                                }}
                                className="text-center p-3"
                            >
                              <blockquote className="blockquote mb-0 card-body">
                                <h2>
                                  Team Fork
                                  <br/>
                                  Logging Solution System
                                </h2>
                              </blockquote>
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
                                <Card.Title>Logs Visualization</Card.Title>
                                <br/>
                                <Card.Text>
                                  Analyze and view logs using charts{" "}
                                </Card.Text>
                                <br/>
                                <Button href="home/chart" variant={theme}>
                                  Logs visualization{" "}
                                </Button>
                              </Card.Body>
                            </Card>
                        )}
                      </CardDeck>
                    </Container>
                  </Col>
                </Row>
                <br/>
                <br/>
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
                              <Card.Title>Compress Log Files</Card.Title>
                              <br/>
                              <Card.Text>Logs manually Compress</Card.Text>
                              <br/>
                              <br/>
                              <Button href="/home/backup" variant={theme}>
                                Compress Log Files{" "}
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
                              <Card.Title>
                                Logs Predictions{" "}
                              </Card.Title>
                              <br/>
                              <Card.Text>View predictions using log files</Card.Text>
                              <br/>
                              <br/>
                              <Button href="/home/plot" variant={theme}>
                                {" "}
                                View predictions{" "}
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
                              <Card.Title>Customer Request Form</Card.Title>
                              <br/>
                              <Card.Text>
                                Collect customer requests details{" "}
                              </Card.Text>
                              <br/>
                              <br/>
                              <Button href="/home/customerform" variant={theme}>
                                Request Form{" "}
                              </Button>
                            </Card.Body>
                          </Card>
                      )}
                    </CardDeck>
                  </Container>
                </Row>
                <br/>
                <br/>
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
                              <Card.Title>Customer Request Details</Card.Title>
                              <br/>
                              <Card.Text>View customer request details</Card.Text>
                              <br/>
                              <br/>
                              <Button href="home/request" variant={theme}>
                                view request details{" "}
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
                              <Card.Title>User Management</Card.Title>
                              <br/>
                              <Card.Text>
                                View users details and manage users{" "}
                              </Card.Text>
                              <br/>
                              <br/>
                              <Button href="home/userdetails" variant={theme}>
                                view users{" "}
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
                              <Card.Title>View User Login History</Card.Title>
                              {" "}
                              <br/>
                              <Card.Text>You can view user login history.</Card.Text>
                              <br/>
                              <br/>
                              <Button href="/home/user_history" variant={theme}>
                                View Login History{" "}
                              </Button>
                            </Card.Body>
                          </Card>
                      )}
                    </CardDeck>
                  </Container>
                </Row>
              </Container>
          ) : (
              <div className="text-center" style={{marginTop: "20%"}}>
                <HashLoader color={"#292b2c"} loading={true} size={150}/>
              </div>
          )}
        </div>
    );
  }
}

export default withRouter(Home);
