import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable, MDBNavLink } from "mdbreact";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import CsvDownload from "react-json-to-csv";

class View extends Component {
  state = {
    ipData: [], loading: false
  };
  async componentDidMount() {
    await axios
      .get(
        `http://localhost:8080/api/auth/log?fileId=${this.props.match.params.id}`
      )
      .then((res) => {
        console.log("data:" + res);
        this.setState({
          ipData: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      this.setState({
        loading: true,
      });
  }
  render() {
    const data = {
      columns: [
        {
          label: "No",
          field: "no",
          sort: "asc",
        },
        {
          label: "Time",
          field: "time",
          sort: "asc",
        },
        {
          label: "Source",
          field: "source",
          sort: "asc",
        },
        {
          label: "Destination",
          field: "destination",
          sort: "asc",
        },
        {
          label: "Protocol",
          field: "protocol",
          sort: "asc",
        },
        {
          label: "Length",
          field: "length",
          sort: "asc",
        },
        {
          label: "Info",
          field: "info",
          sort: "asc",
        },
      ],
      rows: [
        ...this.state.ipData.map((data, i) => ({
          no: data.no,
          time: data.time,
          source: data.source,
          destination: data.destination,
          protocol: data.protocol,
          length: data.length,
          info: data.info,
        })),
      ],
    };
    console.log("sx: " + this.props.match.params.id);

    return (
      <div>
        <div className="container">
          <div classname="row g-3">
            <div classname="col">
              {/* <button type="button" class="btn btn-primary my-5">
                Backup <i class="fas fa-ticket" aria-hidden="true"></i>
              </button> */}
              <h2 className="text-center my-5 text-weight-3 text-dark">
                Data Table
              </h2>
            </div>
          </div>
          <div className="container p-3">
            {this.state.loading ? (
              <div>
                <MDBDataTable responsive striped bordered hover data={data} />
                <CsvDownload
                  filename="data.csv"
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "3px 6px",
                  }}
                  data={this.state.ipData}
                >
                  <button type="button" className="btn btn-dark">
                    Download Data<i className="fas fa-download p-2"></i>
                  </button>
                </CsvDownload>
              </div>
            ) : (
              <div className="text-center" style={{ marginTop: "20%" }}>
                <HashLoader color={"#292b2c"} loading={true} size={150} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default View;
