import React, {Component} from "react";
import axios from "axios";
import {MDBDataTable} from "mdbreact";
import {Link} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import CsvDownload from "react-json-to-csv";


class Folder extends Component {
    state = {folders: [], loading: false};

    async componentDidMount() {
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
            loading: true
        })
    }

    render() {
        const data = {
            columns: [{
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
                    label: "Document",
                    field: "action1",
                    sort: "asc",
                },
                {
                    label: "Chart",
                    field: "action2",
                    sort: "asc",
                },
            ],
            rows: [
                ...this.state.folders.map((data, i) => ({
                    fileName: data.fileName,
                    date: data.date,
                    action1: (
                        <Link to={
                            {pathname: `/home/view/${data._id}`}}>
                            <u style={
                                {color: 'blue'}}> open document < /u>
                        </Link>
                    ),
                    action2: (
                        <Link to={
                            {pathname: `/home/chartcomponent/${data._id}`}}>
                            <u style={
                                {color: 'blue'}}> view chart < /u>
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
                <div className="container p-3"> {
                    this.state.loading ? (<
                            div>
                            <MDBDataTable responsive striped bordered hover data={data}/>
                            <CsvDownload filename="data.csv"
                                         style={
                                             {
                                                 display: "inline-block",
                                                 cursor: "pointer",
                                                 color: "#ffffff",
                                                 fontSize: "15px",
                                                 fontWeight: "bold",
                                                 padding: "3px 6px",
                                             }
                                         }
                                         data={this.state.folders}>
                                <button type="button"
                                        className="btn btn-dark">
                                    Download Data <i className="fas fa-download p-2"> </i>
                                </button>
                            </CsvDownload>
                        </div>
                    ) : (<div className="text-center"
                              style={
                                  {marginTop: "20%"}}>
                            <HashLoader color={"#292b2c"}
                                        loading={true}
                                        size={150}
                            />
                        </div>
                    )
                }
                </div>
            </div>
        );
    }
}

export default Folder;