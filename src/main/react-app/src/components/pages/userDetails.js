import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Table } from "react-bootstrap";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import FaceIcon from "@material-ui/icons/Face";
import HashLoader from "react-spinners/HashLoader";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
      userdetails: [],
      loading: false,
    };
  }

  componentDidMount() {
    document.title = "User Details";
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    axios
      .get("http://localhost:8080/api/auth/users")
      .then((response) => response.data)
      .then((data) => {
        console.log("view users");
        this.setState({ userdetails: data, loading: true });
      });
    this.setState({
      loading: false,
    });
  }

  deleteUser = (userId) => {
    axios
      .delete("http://localhost:8080/api/auth/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            userdetails: this.state.userdetails.filter(
              (data) => data.id !== userId
            ),
          });
        } 
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  render() {
    const { currentUser } = this.state;
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
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr style={{ color: "white", background: "#343A40" }}>
                    <th className="ml-3">#</th>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Telephone No.</th>
                    <th>Joined</th>
                    <th style={{ textAlign: "center" }}>
                      <span>Modify</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.userdetails.length === 0 ? (
                    <tr>
                      <td>No</td>
                    </tr>
                  ) : (
                    this.state.userdetails.map((user, index) => (
                      <tr key={user.id}>
                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{1 + index++}</b>
                          </td>
                        ) : (
                          <td>{1 + index++}</td>
                        )}
                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{user.name}</b>
                          </td>
                        ) : (
                          <td>{user.name}</td>
                        )}
                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{user.nic}</b>
                          </td>
                        ) : (
                          <td>{user.nic}</td>
                        )}
                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{user.username}</b>
                          </td>
                        ) : (
                          <td>{user.username}</td>
                        )}

                        {user.id === currentUser.id ? <td style={{ color: "black", background: "#A9C2E3" }}>
                          {user.roles &&
                            user.roles.map((role, i) => (
                              <p key={i}>
                                {role.name === "ROLE_USER" ? (
                                  <p><b>User</b></p>
                                ) : (
                                  <p><b>Admin</b></p>
                                )}
                              </p>
                            ))}
                        </td> : <td >
                          {user.roles &&
                            user.roles.map((role, index) => (
                              <p key={index}>
                                {role.name === "ROLE_USER" ? (
                                  <p>User</p>
                                ) : (
                                  <p>Admin</p>
                                )}
                              </p>
                            ))}
                          </td>}

                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{user.phone}</b>
                          </td>
                        ) : (
                          <td>{user.phone}</td>
                        )}
                        {user.id === currentUser.id ? (
                          <td style={{ color: "black", background: "#A9C2E3" }}>
                            <b>{user.date}</b>
                          </td>
                        ) : (
                          <td>{user.date}</td>
                        )}

                        {user.id === currentUser.id ? (
                          <td
                            style={{
                              textAlign: "center",
                              color: "black",
                              background: "#A9C2E3",
                            }}
                          >
                            <Tooltip title="You" placement="right">
                              <IconButton
                                aria-label="face-icon"
                                fontSize="small"
                              >
                                <FaceIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        ) : (
                          <td>
                            <Tooltip title="Delete" placement="right">
                              <IconButton
                                aria-label="delete"
                                onClick={this.deleteUser.bind(this, user.id)}
                                fontSize="small"
                              >
                                <HighlightOffIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(UserDetails);
