import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import HashLoader from "react-spinners/HashLoader";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
      userdetails: [],
      loading: false,
      isAdminShow: true,
    };
  }

  componentDidMount() {
    document.title = "User Details";
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        //loading: true,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    axios
      .get("http://localhost:8080/api/auth/users")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ userdetails: data, loading: true });
      });
    this.setState({
      loading: false,
    });
  }

  userShow = () => {
    const { isAdminShow } = this.state;
    this.setState({ isAdminShow: !isAdminShow });
  };
  deleteUser = (userId) => {
    axios
      .delete("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            userdetails: this.state.userdetails.filter(
              (data) => data.id !== userId
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  render() {
    const { isAdminShow, currentUser } = this.state;
    return (
      <div>
        <div className="container mgntop">
          {!this.state.loading ? (
            <div className="text-center" style={{ marginTop: "20%" }}>
              <HashLoader color={"#292b2c"} loading={true} size={150} />
            </div>
          ) : (
            <div>
              <h4 style={{ textAlign: "center" }}>
                {" "}
                User Details <br />
              </h4>
              <br />
              {isAdminShow ? (
                <Button
                  style={{ float: "right" }}
                  href="#"
                  variant="light"
                  size="sm"
                  onClick={this.userShow}
                >
                  Show Regular Users
                </Button>
              ) : (
                <Button
                  size="sm"
                  href="#"
                  variant="light"
                  style={{ float: "right" }}
                  onClick={this.userShow}
                >
                  Show Admins
                </Button>
              )}
              <br />
              {isAdminShow ? (
                <div>
                  <h6>Admins</h6>
                  <br />
                  <Table responsive striped bordered hover size="sm">
                    <thead>
                      <tr style={{ color: "white", background: "#343A40" }}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telephone No.</th>
                        <th>Joined</th>
                      </tr>
                    </thead>

                    {this.state.userdetails.length === 0 ? (
                      <tr>
                        <td>Wait ...</td>
                      </tr>
                    ) : (
                      this.state.userdetails.map((user, i) => (
                        <tbody>
                          {user.roles &&
                            user.id !== currentUser.id &&
                            user.roles.map((role, index) => (
                              <tr key={index}>
                                {role.name === "ROLE_ADMIN" ? (
                                  <td>{user.name}</td>
                                ) : null}
                                {role.name === "ROLE_ADMIN" ? (
                                  <td>{user.username}</td>
                                ) : null}
                                {role.name === "ROLE_ADMIN" ? (
                                  <td>{user.phone}</td>
                                ) : null}
                                {role.name === "ROLE_ADMIN" ? (
                                  <td>{user.date}</td>
                                ) : null}
                              </tr>
                            ))}
                          {user.id === currentUser.id && (
                            <tr
                              style={{ color: "black", background: "#A9C2E3" }}
                            >
                              <td>{user.name}</td>
                              <td>{user.username}</td>
                              <td>{user.phone}</td>
                              <td>{user.date}</td>
                            </tr>
                          )}
                        </tbody>
                      ))
                    )}
                  </Table>
                </div>
              ) : (
                <div>
                  <h6>Users</h6>
                  <br />
                  <Table responsive striped bordered hover size="sm">
                    <thead>
                      <tr style={{ color: "white", background: "#343A40" }}>
                        <th className="ml-3">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telephone No.</th>
                        <th>Joined</th>
                        <th style={{ textAlign: "center" }}>
                          <span>Modify</span>
                        </th>
                      </tr>
                    </thead>

                    {this.state.userdetails.length === 0 ? (
                      <tr>
                        <td>No</td>
                      </tr>
                    ) : (
                      this.state.userdetails.map((user, i) => (
                        <tbody>
                          {user.roles &&
                            user.roles.map((role, index) => (
                              <tr key={index}>
                                {role.name === "ROLE_USER" ? (
                                  <td>{++i}</td>
                                ) : null}
                                {role.name === "ROLE_USER" ? (
                                  <td>{user.name}</td>
                                ) : null}
                                {role.name === "ROLE_USER" ? (
                                  <td>{user.username}</td>
                                ) : null}
                                {role.name === "ROLE_USER" ? (
                                  <td>{user.phone}</td>
                                ) : null}
                                {role.name === "ROLE_USER" ? (
                                  <td>{user.date}</td>
                                ) : null}
                                {role.name === "ROLE_USER" ? (
                                  <td>
                                    <Tooltip
                                      title={"delete " + user.username}
                                      placement="right"
                                    >
                                      <IconButton
                                        aria-label="delete"
                                        onClick={this.deleteUser.bind(
                                          this,
                                          user.id
                                        )}
                                        fontSize="small"
                                      >
                                        <HighlightOffIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                ) : null}
                              </tr>
                            ))}
                        </tbody>
                      ))
                    )}
                  </Table>
                </div>
              )}
            </div>
          )}
        </div><br/>
      </div>
    );
  }
}
export default withRouter(UserDetails);
