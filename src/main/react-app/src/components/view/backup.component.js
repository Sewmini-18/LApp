import React, {Component} from "react";
import axios from "axios";
import {MDBDataTable} from "mdbreact";
import {Link} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

class BackupView extends Component {
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

    handleChangeChk(checked, index){
        const folders = [...this.state.folders];
        folders[index].select = checked;
        this.setState({folders});
    }

    onBackupFile(e){

        const recordIds = this.state.folders.filter((file)=> file.select === true).map(e=> e._id);

        axios({
            url: "http://localhost:8080/api/auth/file",
            data: {
                    recordIds
                },
            method: 'POST',
            responseType: 'blob',

        }).then((response)=>{
            console.log("Downloaded");
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.zip');
            document.body.appendChild(link);
            link.click();
        }).catch(
            reason => {
                console.error("Error occurred");
                console.error(reason);
            }
        );

    }

    onDeleteFiles(e) {

        const selectedFiles = this.state.folders.filter((file)=> file.select === true);

        const recordIds = selectedFiles.map(e=> e._id);
        axios({
            url: "http://localhost:8080/api/auth/file",
            data: {
                recordIds
            },
            method: 'DELETE',
            responseType: 'blob',

        })
        const folders = this.state.folders.filter((file)=> !file.select);
        this.setState({folders });
    }
    render() {
        const data = {
            columns: [
                {
                    label: "Select",
                    field: "action3",
                    sort: "disabled",
                },{
                    label: "File Name",
                    field: "fileName",
                    sort: "disabled",
                },
                {
                    label: "Date",
                    field: "date",
                    sort: "disabled",
                },
                {
                    label: "Document",
                    field: "action1",
                    sort: "disabled",
                },
                {
                    label: "Chart",
                    field: "action2",
                    sort: "disabled",
                },

            ],
            rows: [
                ...this.state.folders.map((data, i) => ({
                    fileName: data.fileName,
                    date: data.date,
                    action3: (
                        <input type="checkbox" defaultChecked={data.select} onChange={(e)=> this.handleChangeChk(e.target.checked, i)} />
                    ),
                    action1: (
                        <Link to={{
                            pathname: `/home/view/${data._id}`,
                            state: {
                                fName:`${data.fileName}`
                            }
                        }}>
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
                    this.state.loading ? (
                        <div>
                            <MDBDataTable hover entriesOptions={[10, 20, 50, 100]} entries={10} data={data} materialSearch striped bordered style={{backgroundColor : "#f0f5fa"}}/>
                            <button style={{marginRight: "2%", marginTop: "0.25%"}} type="button"
                                    className="btn btn-outline-danger"
                                    onClick={(e)=>this.onDeleteFiles(e)}
                            >
                                Delete Files <i className="fas fa-download p-2"> </i>
                            </button>
                            <button style={{marginRight: "2%", marginTop: "0.25%"}} type="button"
                                    className="btn btn-outline-success"
                                    onClick={(e)=>this.onBackupFile(e)}
                            >
                                Compress Files <i className="fas fa-download p-2"> </i>
                            </button>
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

export default BackupView;