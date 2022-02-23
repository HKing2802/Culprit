import React from 'react';
import { Container, Navbar, NavbarBrand, Row, Col, Button } from 'reactstrap';
import './landing.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Navbar
                    color="dark"
                    dark
                    expand="md"
                    >
                    <NavbarBrand>
                        Culprit
                    </NavbarBrand>
                </Navbar>
            </div>
        )
    }
}

class Desc extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col className="bg-light border">
                        The year is 2107. Prisoners awaiting trial for murder in Lockhurst Prison wake up to a knock and find a note, containing a deal. 
                        Out of a lack of workforce and care, the prisoners have been grouped up to solve each other's crimes. The deal: the prisoner who helps the police solve the most cases goes free. 
                        Linked by a shared computer system, each criminal has one goal: outwit the other prisoners, hide their own case's details, and find every case's true Culprit.
                    </Col>
                </Row>
            </Container>
        )
    }
}

class Landing extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Desc />
                <div className="startButtons">
                    <Button
                        className="newGameButton"
                        color="primary"
                    >
                        New Game
                    </Button>
                    <Button
                        className="resumeGameButton"
                        color="primary"
                    >
                        Resume Game
                    </Button>
                </div>
            </div>
        )
    }
}


export default Landing;