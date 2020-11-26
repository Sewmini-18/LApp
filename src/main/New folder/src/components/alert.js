import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';


class ActionAlerts extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isActive: true,
        }
    }

    hideAlert() {
        this.setState({
            isActive: false,
        });
    }

    render() {
        if (this.state.isActive) {
            return (

                <div>
                    <div >
                        <Alert variant="outlined" severity={this.props.children.severity} onClose={() => this.hideAlert()}  >{this.props.children.message}</Alert>
                    </div>
                </div>

            );
        }

    }
}

export default ActionAlerts;