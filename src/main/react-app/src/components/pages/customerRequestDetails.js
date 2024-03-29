import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Tooltip from "@material-ui/core/Tooltip";
import BackImage from "./images/114.jpg";

class customerRequestDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      loading: false,
    };
  }

  componentDidMount() {
    document.title = "Customer Request Details";
    document.body.style.backgroundImage = `url(${ BackImage })`;
    document.body.style.backgroundRepeat = `no-repeat`;
    document.body.style.backgroundSize = "100%";
    document.body.style.opacity ="80%";
    axios
      .get("http://localhost:8080/api/auth/requests")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ requests: data, loading: true });
      });
    document.title = "Customer Requests";
  }

  deleteReq = (reqId) => {
 
    axios
      .delete("http://localhost:8080/api/auth/request/" + reqId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            requests: this.state.requests.filter((data) => data.id !== reqId),
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  render() {

    return (
      <div>
        <h4 style={{ textAlign: "center" }}>Request Details</h4>
        <div className="container mgntop">
          {this.state.loading ? (
            <div>
              <Tooltip title="Add Request" placement="top">
                <IconButton
                  href="../home/customerform"
                  aria-label="delete"
                  ontSize="small"
                >
                  <AddToPhotosIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr style={{ color: "white", background: "#343A40" }}>
                    <th> # </th>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Email</th>
                    <th>contact No</th>
                    <th>Reason</th>
                    <th>Date-Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.requests.length === 0 ? (
                    <tr align="center">
                      <td colSpan="7">
                        {this.state.requests.length} No Requests Available.
                      </td>
                    </tr>
                  ) : (
                    this.state.requests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{1 + index++}</td>
                        <td>{request.c_name}</td>
                        <td>{request.c_nic}</td>
                        <td>{request.email}</td>
                        <td>{request.phone}</td>
                        <td>{request.reason}</td>
                        <td>{request.date}</td>
                        <td style={{ textAlign: "left", alignItems: "left" }}>
                          <Tooltip title="Delete" placement="right">
                            <IconButton
                              aria-label="delete"
                              onClick={this.deleteReq.bind(this, request.id)}
                              fontSize="small"
                            >
                              <HighlightOffIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center" style={{ marginTop: "20%" }}>
              <HashLoader color={"#292b2c"} loading={true} size={150} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default customerRequestDetails;
