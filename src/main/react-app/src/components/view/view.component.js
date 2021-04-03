import React, {Component,} from "react";
import axios from "axios";
import {MDBDataTable} from "mdbreact";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 30;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "Report";
    const headers = [["No", "Time","Source","Destination","Protocol","Length","Info"]];

    const data = this.state.ipData.map(elt=> [elt.no, elt.time,elt.source,elt.destination,elt.protocol,elt.length,elt.info]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      columnStyles:{
        0: {cellWidth: 45},
        1: {cellWidth: 45},
        2: {cellWidth: 95},
        3: {cellWidth: 95},
        4: {cellWidth: 50},
        5: {cellWidth: 50},
        6: {cellWidth: 150},
      }

    }
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");

  }

  exportFTP = () =>{
        const data = this.state.ipData.toString();
        alert("Data Send to FTP server");
        axios.post(`https://localhost:8080/sendToFTP`, { data })
            .then(res => {
                console.log(res);
                console.log(res.data);

            })
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
                  <div style={{marginBottom:"5%"}}>
                    <MDBDataTable responsive striped bordered hover data={data}/>

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
                        Download as csv<i className="fas fa-download p-2"></i>
                      </button>
                    </CsvDownload>
                    <button style={{marginRight:"2%",marginTop:"0.25%"}} type="button" className="btn btn--blue" onClick={() => this.exportPDF()}> Download as pdf</button>
                      <button style={{marginRight:"2%",marginTop:"0.25%"}} type="button" className="btn btn--blue" onClick={() => this.exportFTP()}> Download as pdf</button>
                  </div>
              ) : (
                  <div className="text-center" style={{marginTop: "20%", marginBottom:"30%"}}>
                    <HashLoader color={"#292b2c"} loading={true} size={150}/>
                  </div>

              )}
            </div>
          </div>
        </div>
    );
  }
}

export default View;
