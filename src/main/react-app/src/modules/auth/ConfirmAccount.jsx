import React, { Component } from "react";
import Header from "../../components/pages/header";
import authService from "../../services/auth.service";
import "./Auth.css";

class ConfirmAccount extends Component {
  componentDidMount() {
    const token = new URLSearchParams(this.props.location.search).get("token");
    console.log("ConfirmAccount : token : ", token);
    if (token) {
      authService.confirmAccount(token).then(
        () => {
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    return (
      <>
        <Header />
        <div style={{ backgroundColor: "#f5f5f5", minHeight: 1000 }}>
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>F</div>
            <div>I</div>
            <div>R</div>
            <div>E</div>
            <div>V</div>
          </div>
        </div>
      </>
    );
  }
}

export default ConfirmAccount;
