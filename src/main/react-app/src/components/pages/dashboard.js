import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../home.component'
import Header from './header'
import CustomerForm from './customerForm'
import Footer from './footer'
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../profile.component'


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