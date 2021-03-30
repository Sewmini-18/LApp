import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Dashboard from './components/pages/dashboard';
import Signin from './components/pages/signin';
import Signup from './components/pages/signup';



class App extends Component {


    render() {


        return (

            <
            div >
            <
            Switch >
            <
            Route path = "/register"
            component = { Signup }
            /> <
            Route path = "/home"
            render = {
                (props) => < Dashboard {...props }
                />} / >
                <
                Route path = "/login"
                component = { Signin }
                /> <
                Redirect from = "/"
                to = "/login" / >
                <
                /Switch> < /
                div >
            );
        }
    }

    export default App;