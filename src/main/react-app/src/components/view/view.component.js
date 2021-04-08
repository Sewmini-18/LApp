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
  //download as pdf
  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 30;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "Report";
    const headers = [["Time","Source","Destination","Protocol","Length"]];

    const data = this.state.ipData.map(elt=> [elt.time,elt.source,elt.destination,elt.protocol,elt.length]);

    let content = {
      startY: 50,
      head: headers,
      body: data

    }
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");

  }
 //export to FTP
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
          label: "Protocol",
          field: "protocol",
          sort: "asc",
        },
        {
          label: "Destination",
          field: "destination",
          sort: "asc",
        },

        {
          label: "Length",
          field: "length",
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

      ],
      rows: [
        ...this.state.ipData.map((data, i) => ({
          protocol: data.protocol,
          destination: data.destination,
          length: data.length,
          time: data.time,
          source: data.source,

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
                      <button style={{marginRight:"2%",marginTop:"0.25%"}} type="button" className="btn btn--blue" onClick={() => this.exportFTP()}> Export to FTP</button>
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
