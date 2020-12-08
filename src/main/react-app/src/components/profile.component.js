import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from '../services/auth.service';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '' }
    };
  }

  componentDidMount() {
    document.title = 'Profile'
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: '/profile'});
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.name}</strong> Profile
              </h3>
            </header>

            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.username}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {currentUser.name}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div> : null}
      </div>
    );
  }
}
