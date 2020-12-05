import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { Dvr } from '@material-ui/icons';
import AuthService from '../../services/auth.service'


class Header extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {

      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }


  render() {

    const { currentUser, showAdminBoard } = this.state;

    const mTop = {
      marginTop: "20px",

    }

    return (
      <div>
        <div className="header">

          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/home">
              <Dvr fontSize="large" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
                {currentUser && (
                  <Nav.Link href="/home/profile">
                    Profile {"   "}    </Nav.Link>
                )}


                {showAdminBoard && (
                  <Nav.Link href="/home/customerform">{"   "}Form</Nav.Link>

                )}
                

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/home">Action</NavDropdown.Item>
                  <NavDropdown.Item href="home/profile">Another action</NavDropdown.Item>
                </NavDropdown>

              </Nav>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                LogOut
                </a>
            </Navbar.Collapse>

          </Navbar>
        </div>
        <Col sm={6} style={mTop}></Col>
      </div>
    );
  }
}

export default withRouter(Header);