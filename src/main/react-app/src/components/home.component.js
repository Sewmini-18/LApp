import React, { Component } from 'react';
import { Row, Button, Col, Container, Card, CardDeck } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import AuthService from '../services/auth.service'
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount() {
        document.title = 'Home'
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    render() {
        const { currentUser, showAdminBoard } = this.state;

        return (
            <div className='container mgntop'>
                <Container>
                    <Row>
                        <Col>
                            <Container>
                                <CardDeck>
                                    {currentUser && (
                                        <Card border="info" style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>View Log files</Card.Title>
                                                <br />
                                                <Card.Text>
                                                    You can sort and view log files
                                            </Card.Text>
                                                <br />

                                                <Button to="" variant="info"><a href="/home/view">View Log files</a></Button>

                                            </Card.Body>

                                        </Card>
                                    )}
                                    {showAdminBoard && (
                                        <Card border="info" style={{ width: '18rem' }}>

                                            <Card.Body>
                                                <Card.Title>Export Log Files</Card.Title>
                                                <br />
                                                <Card.Text>
                                                    Logs printing or export to extranal
                                            </Card.Text>
                                                <br />

                                                <Button to="" variant="info">Export log files</Button>
                                            </Card.Body>

                                        </Card>
                                    )}

                                    {showAdminBoard && (
                                        <Card border="info" style={{ width: '18rem' }}>

                                            <Card.Body>
                                                <Card.Title>Backup Log Files</Card.Title>
                                                <br />
                                                <Card.Text>
                                                    Logs manually backup
    </Card.Text>
                                                <br />

                                                <Button to="" variant="info">Backup log files</Button>
                                            </Card.Body>

                                        </Card>
                                    )}

                                </CardDeck>
                            </Container></Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Container>
                            <CardDeck>
                                {currentUser && (
                                    <Card border="success" style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Logs Visualization</Card.Title>
                                            <br />
                                            <Card.Text>
                                                Analyze and view logs using charts
                                        </Card.Text>
                                            <br />
                                            <Button href="home/chart" variant="success">Logs visualization</Button>
                                        </Card.Body>

                                    </Card>
                                )}
                                {showAdminBoard && (
                                    <Card border="success" style={{ width: '18rem' }}>

                                        <Card.Body>
                                            <Card.Title>Logs Pattern Identification</Card.Title>
                                            <br />
                                            <Card.Text>
                                                View predicted plot for time and length of log files
                                    </Card.Text>
                                            <br />
                                            <Button href="home/plot" variant="success">View predicted plot</Button>
                                            
                                        </Card.Body>

                                    </Card>
                                )}
                                {showAdminBoard && (
                                    <Card border="success" style={{ width: '18rem' }}>

                                        <Card.Body>
                                            <Card.Title>Customer Request</Card.Title>
                                            <br />
                                            <Card.Text>
                                                View customer request details
                                    </Card.Text>
                                            <br />

                                            <Button href="home/request" variant="success">view request details</Button>
                                        </Card.Body>

                                    </Card>

                                )}
                                {showAdminBoard && (
                                    <Card border="success" style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>View Users</Card.Title><br />
                                            <Card.Text>View users...</Card.Text><br />
                                            <Button href="home/userdetails" variant="primary">view users</Button>
                                        </Card.Body>
                                    </Card>
                                )}
                            </CardDeck>
                        </Container>
                    </Row>
                </Container>

            </div>
        );
    }
}
export default withRouter(Home);