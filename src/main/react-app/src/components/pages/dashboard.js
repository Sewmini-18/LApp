import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../home.component'
import Header from './header'
import CustomerForm from './customerForm'
import Footer from './footer'
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../profile.component'
import Chart from '../pages/chart'
import CustomerRequestDetails from '../pages/customerRequestDetails'
import EditUser from '../pages/editUser'
import UserDetails from '../pages/userDetails'

class Dashboard extends React.Component {

    render() {
        const { match } = this.props
        return (

            <div >
                <Header appTitle="Home" />
                <Switch>
                    <Route
                        exact path={`${match.path}`}
                        render={(props) => <Home {...props} />} />
                    <Route path={`${match.path}/profile`} component={Profile} />
                    <Route path={`${match.path}/customerform`} component={CustomerForm} />
                    <Route path={`${match.path}/chart`} component={Chart} />
                    <Route path={`${match.path}/request`} component={CustomerRequestDetails} />
                    <Route path={`${match.path}/edit`} component={EditUser} />
                    <Route path={`${match.path}/userdetails`} component={UserDetails} />

                    
                </Switch>
                <Footer />
            </div>

        )
    }
}

Dashboard.propTypes = {
    match: PropTypes.any.isRequired
}


export default Dashboard;