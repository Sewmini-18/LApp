import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import BackImage from "./images/114.jpg";

class Folder extends Component {
  state = { folders: [], loading: false };

  async componentDidMount() {
    document.title = "Logs Visualization";
    document.body.style.backgroundImage = `url(${ BackImage })`;
    document.body.style.backgroundRepeat = `no-repeat`;
    document.body.style.backgroundSize = "100%";
    document.body.style.opacity ="80%";
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
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [
        ...this.state.folders.map((data, i) => ({
          fileName: data.fileName,
          date: data.date,
          action: (
            <Link to={{ pathname: `/home/chartcomponent/${data._id}` }}>
              <u style={{ color: "blue" }}> view chart</u>
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
              <MDBDataTable responsive striped bordered hover data={data} />
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
