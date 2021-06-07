import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

class Folder extends Component {
  state = { folders: [], loading: false };

  async componentDidMount() {
    document.title = "View and Export Logs - Folders";
    await axios
      .get("http://localhost:8080/api/auth/file")
      .then((res) => {
        //console.log(res);
        this.setState({
          folders: res.data,
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
          label: "File Name",
          field: "fileName",
          sort: "disable",
        },
        {
          label: "Date",
          field: "date",
          sort: "disable",
        },
        {
          label: "Document",
          field: "action1",
          sort: "disable",
        },
        {
          label: "Chart",
          field: "action2",
          sort: "disable",
        },
      ],
      rows: [
        ...this.state.folders.map((data, i) => ({
          fileName: data.fileName,
          date: data.date,
          action1: (
            <Link
              to={{
                pathname: `/home/view/${data._id}`,
                state: {
                  fName: `${data.fileName}`,
                },
              }}
            >
              <u style={{ color: "blue" }}> open document </u>
            </Link>
          ),
          action2: (
            <Link to={{ pathname: `/home/chartcomponent/${data._id}` }}>
              <u style={{ color: "blue" }}> view chart </u>
            </Link>
          ),
        })),
      ],
    };
    return (
      <div>
        <div className="container">
          <div className="row g-3">
            <div className="col">
              <h2 className="text-center my-5 text-weight-3 text-dark">
                Data Folders
              </h2>
            </div>
          </div>
        </div>
        <div className="container p-3">
          {" "}
          {this.state.loading ? (
            <div>
              <MDBDataTable hover entriesOptions={[10, 20, 50, 100]} entries={10} data={data} materialSearch striped bordered style={{backgroundColor : "#f0f5fa"}}/>
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

export default Folder;
