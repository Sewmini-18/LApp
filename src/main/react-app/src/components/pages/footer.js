import { Container } from '@material-ui/core';
import React from 'react';
import { Navbar, Col } from 'react-bootstrap';


const Footer = () => {
    const mTop = {
        marginTop: "40px",
       
    }

    return (
        <div className="footer">
             <Col sm={6} style={mTop}></Col>
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col className="text-center text-muted" >
                        <div>All rights reserved</div>
                    </Col>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer;