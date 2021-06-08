import React, {Component} from "react";
import axios from "axios";
import {MDBDataTable} from "mdbreact";
import HashLoader from "react-spinners/HashLoader";
import BackImage from "../pages/images/114.jpg";

class UserHistory extends Component {
    state = {userDetails: [], loading: false};

    async componentDidMount() {
        document.title = "View User Login History";
        document.body.style.backgroundImage = `url(${ BackImage })`;
        document.body.style.backgroundRepeat = `no-repeat`;
        document.body.style.backgroundSize = "100%";
        document.body.style.opacity ="80%";
        await axios
            .get("http://localhost:8080/api/auth/userLog")
            .then((res) => {
                //console.log(res);
                this.setState({
                    userDetails: res.data,
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
                    label: "User Name",
                    field: "userName",
                    sort: "disabled",
                },
                {
                    label: "Date / Time",
                    field: "date",
                    sort: "asc",
                },
            ],
            rows: [
                ...this.state.userDetails.map((data, i) => ({
                    userName: data.username,
                    date: data.date,
                })),
            ],
        };
        return (
            <div>
                <div className="container">
                    <div classname="row g-3">
                        <div classname="col">
                            <h2 className="text-center my-5 text-weight-3 text-dark">
                                User Login History
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container p-3">
                    {this.state.loading ? (
                        <div>
                            <MDBDataTable hover entriesOptions={[10, 20, 50, 100]} entries={10} data={data}
                                          materialSearch striped bordered style={{backgroundColor: "#f0f5fa"}} />

                        </div>
                    ) : (
                        <div className="text-center" style={{marginTop: "20%"}}>
                            <HashLoader color={"#292b2c"} loading={true} size={150}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default UserHistory;
