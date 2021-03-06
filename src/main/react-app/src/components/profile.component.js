import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from '../services/auth.service';
import './pages/css/profile.css'
import { Figure, Card, Button } from 'react-bootstrap'
import userPic from './pages/images/user.png'
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
    console.log("id: "+currentUser.id);
    if (!currentUser) this.setState({ redirect: './' });
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

            <div className="page-content container" id="page-content">
              <div className="">
                <div className="row container">
                  <div className="col-xl-12 col-md-12">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25"><Figure>
                            <Figure.Image
                              width={120}
                              height={120}
                              alt="120x120"
                              src={userPic}
                            />
                            <Figure.Caption>
                              Profile Picture
                            </Figure.Caption>
                          </Figure></div>
                          <h4 className="f-w-600">{currentUser.name}</h4>
                          <p><br/>{currentUser.roles}</p>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="card-block-right">
                          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Basic Information</h6>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Name</p>
                              <h6 className="text-muted f-w-400">{currentUser.name}</h6><br /><br />
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">NIC Number</p>
                              <h6 className="text-muted f-w-400">{currentUser.nic}</h6>
                            </div>
                          </div>
                          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Contact Information</h6>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Email</p>
                              <h6 className="text-muted f-w-400">{currentUser.username}</h6>
                            </div>
                            <div className="col-sm-6 m-b-10">
                              <p className="m-b-10 f-w-600">Telephone</p>
                              <h6 className="text-muted f-w-400">{currentUser.id}</h6><br /><br />
                            </div>
                          </div>
                          <div className="row m-t-button m-l-5">

                            <Button href={"edit/userId=?"+currentUser.id} variant="primary">Edit Profile</Button>


                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>



          </div> : null}





      </div>


    );
  }
}
