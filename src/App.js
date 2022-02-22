import React from 'react';
import { ButtonGroup, Button, Navbar, NavbarBrand, NavbarText, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css';

const pageComponentMap = new Map();
let CURRENT_PLAYER = 0;
let SESSION_KEY = null;

class HeaderSession extends React.Component {
    render() {
        return (
            <NavbarText className="sessionKeyText">
                Session Key <br /> {this.props.sesKey}
            </NavbarText>
            
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    {this.props.sesKey ? <HeaderSession sesKey={this.props.sesKey} /> : null}
                </Navbar>
            </div>
        )
    }
}

class NumPlayerSelect extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.setNumPlayers = this.setNumPlayers.bind(this);
    }

    setNumPlayers(e) {
        this.props.setNumPlayers(e.target.value);
        this.props.changePage("caseSetup");
    }

    render() {
        return (
            <div className="numSelectButtons">
                <h3> Select Number of Players: </h3>
                <ButtonGroup>
                    <Button
                        color="primary"
                        value="3"
                        onClick={this.setNumPlayers}
                    >
                        3
                    </Button>
                    <Button
                        color="primary"
                        value="4"
                        onClick={this.setNumPlayers}
                    >
                        4
                    </Button>
                    <Button
                        color="primary"
                        value="5"
                        onClick={this.setNumPlayers}
                    >
                        5
                    </Button>
                    <Button
                        color="primary"
                        value="6"
                        onClick={this.setNumPlayers}
                    >
                        6
                    </Button>
                    </ButtonGroup>
                </div>
        )
    }
}

class CaseSetup extends React.Component {
    constructor(props) {
        super(props);

        // info map
        this.info = new Map();
        this.info.set("name", null);
        this.info.set("color", null);
        this.info.set("victim", null);
        this.info.set("weapon", null);
        this.info.set("location", null);

        // binding
        this.submitCaseInfo = this.submitCaseInfo.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    submitCaseInfo() {
        this.info.set('id', CURRENT_PLAYER);
        this.info.set('session', SESSION_KEY);

        fetch("http://192.168.1.145:5000/case-setup", {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(Object.fromEntries(this.info))
        })
            .then(response => {
                console.log(`Case info submitted with status code ${response.status}`);
            })
            .catch(err => {
                console.log(err);
            });

        this.props.changePage("nextPlayerSetup");
    }

    updateInfo(e) {
        this.info.set(e.target.id, e.target.value);
    }

    render() {
        return (
            <Form onSubmit={this.submitCaseInfo}>
                <FormGroup className="caseInput">
                    <Label for="name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="Player Name"
                        placeholder="Enter your Name"
                        type="text"
                        onChange={this.updateInfo}
                    />
                </FormGroup>
                <FormGroup className="caseInput">
                    <Label for="color">
                        Color
                    </Label>
                    <Input
                        id="color"
                        name="Case Color"
                        type="select"
                        onChange={this.updateInfo}
                    >
                        <option selected hidden />
                        <option value="red">
                            Red
                        </option>
                        <option value="orange">
                            Orange
                        </option>
                        <option value="yellow">
                            Yellow
                        </option>
                        <option value="green">
                            Green
                        </option>
                        <option value="blue">
                            Blue
                        </option>
                        <option value="purple">
                            Purple
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup className="caseInput">
                    <Label for="victim">
                        Victim
                    </Label>
                    <Input
                        id="victim"
                        name="Case Victim"
                        type="select"
                        onChange={this.updateInfo}
                    >
                        <option selected hidden />
                        <option value="Nora Perez">
                            Nora Perez
                        </option>
                        <option value="Emmett Parker">
                            Emmett Parker
                        </option>
                        <option value="Arturo Elliot">
                            Arturo Elliot
                        </option>
                        <option value="Scott Walters">
                            Scott Walters
                        </option>
                        <option value="Estelle Woods">
                            Estelle Woods
                        </option>
                        <option value="Warren Fisher">
                            Warren Fisher
                        </option>
                        <option value="Earl Daniels">
                            Earl Daniels
                        </option>
                        <option value="Stephanie McBride">
                            Stephanie McBride
                        </option>
                        <option value="Gregg Washington">
                            Gregg Washington
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup className="caseInput">
                    <Label for="weapon">
                        Weapon
                    </Label>
                    <Input
                        id="weapon"
                        name="Case Weapon"
                        type="select"
                        onChange={this.updateInfo}
                    >
                        <option selected default />
                        <option value="hammer">
                            Hammer
                        </option>
                        <option value="pistol">
                            Pistol
                        </option>
                        <option value="sword">
                            Sword
                        </option>
                        <option value="rock">
                            Rock
                        </option>
                        <option value="dart">
                            Dart
                        </option>
                        <option value="dagger">
                            Dagger
                        </option>
                        <option value="bat">
                            Bat
                        </option>
                        <option value="rifle">
                            Rifle
                        </option>
                        <option value="battle axe">
                            Battle Axe
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup className="caseInput">
                    <Label for="location">
                        Location
                    </Label>
                    <Input
                        id="location"
                        name="Case Location"
                        type="select"
                        onChange={this.updateInfo}
                    >
                        <option slected hidden />
                        <option value="shed">
                            Shed
                        </option>
                        <option value="pool">
                            Pool
                        </option>
                        <option value="shooting range">
                            Shooting Range
                        </option>
                        <option value="kitchen">
                            Kitchen
                        </option>
                        <option value="library">
                            Library
                        </option>
                        <option value="office">
                            Office
                        </option>
                        <option value="storage room">
                            Storage Room
                        </option>
                        <option value="theater">
                            Theater
                        </option>
                        <option value="workshop">
                            Workshop
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup className="caseSubmit">
                    <Input
                        className="caseSubmitBtn"
                        id="submit"
                        value="Submit"
                        type="submit"
                    />
                </FormGroup>
            </Form>
        )
    }
}

class NextPlayerTurn extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.nextPlayer = this.nextPlayer.bind(this);
    }

    nextPlayer() {
        this.props.changePage("caseSetup")
        this.props.nextPlayer();
    }

    render() {
        return (
            <div>
                <h3> Give device to the player on your left </h3>
                <Button
                    color="primary"
                    onClick={this.nextPlayer}
                >
                    Next
                </Button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        // fields
        this.numPlayers = null;

        // binding
        this.changePage = this.changePage.bind(this);
        this.generateSesionKey = this.generateSesionKey.bind(this);
        this.setNumPlayers = this.setNumPlayers.bind(this);
        this.nextPlayer = this.nextPlayer.bind(this);

        // state init
        this.state = { page: "caseSetup", sessionKey: null };

        // loads PageComponent Map
        pageComponentMap.set("numPlayerSelect", <NumPlayerSelect changePage={this.changePage} setNumPlayers={this.setNumPlayers} />);
        pageComponentMap.set("caseSetup", <CaseSetup changePage={this.changePage} />);
        pageComponentMap.set("nextPlayerSetup", <NextPlayerTurn changePage={this.changePage} nextPlayer={this.nextPlayer} />)
    }

    changePage(name) {
        this.setState({ page: name });
    }

    generateSesionKey() {
        // get a session key
        this.setState({ sessionKey: "" });
        SESSION_KEY = "";
    }

    setNumPlayers(n) {
        const parsed = parseInt(n, 10);
        if (!isNaN(parsed)) {
            this.numPlayers = parsed;
        } else {
            throw new Error("Number of Players is Not a Number");
        }
    }

    nextPlayer() {
        let nextPlayerNum = CURRENT_PLAYER + 1;
        if (nextPlayerNum >= this.numPlayers) {
            nextPlayerNum = 0;
        }
        CURRENT_PLAYER = nextPlayerNum;
    }

    render() {
        return (
            <div className="app">
                <Header sesKey={ this.state.sessionKey } />
                {pageComponentMap.get(this.state.page)}
            </div>
        )
    }
}


export default App;