import React from 'react';
import { ButtonGroup, Button, Navbar, NavbarBrand, NavbarText, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css';

const pageComponentMap = new Map();
const playerNameMap = new Map();

// ----------- DEV TEMP -----------
playerNameMap.set(0, "Adam");
// --------------------------------

const SERVER_ADDR = "http://localhost:5000/"

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
        this.props.generateSesionKey();
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

        fetch(`${SERVER_ADDR}case-setup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(this.info))
        })
            .then(response => {
                console.log(`Case info submitted with status code ${response.status}`);
            })
            .catch(err => {
                console.log(err);
            });

        if (this.props.checkSetupComplete()) {
            this.props.loadPlayerNameMap();
            this.props.changePage("nextPlayerTurn");
        } else {
            this.props.changePage("nextPlayerSetup");
        }
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

class NextPlayerSetup extends React.Component {
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

class NextPlayerTurn extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.nextPlayer = this.nextPlayer.bind(this);
    }

    nextPlayer() {
        this.props.changePage("");
        this.props.nextPlayer();
    }

    render() {
        if (this.props.playerMapLoaded) {
            return (
                <div className="nextTurn">
                    <h4> Next Turn </h4>
                    <h1> {playerNameMap.get(CURRENT_PLAYER)} </h1>
                    <Button
                        className="nextTurnBtn"
                        color="primary"
                        onClick={this.nextPlayer}
                    >
                        Start Turn
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        // fields
        this.numPlayers = null;

        // binding
        this.reloadPageComponentState = this.reloadPageComponentState.bind(this);
        this.changePage = this.changePage.bind(this);
        this.generateSesionKey = this.generateSesionKey.bind(this);
        this.setNumPlayers = this.setNumPlayers.bind(this);
        this.nextPlayer = this.nextPlayer.bind(this);
        this.checkSetupComplete = this.checkSetupComplete.bind(this);
        this.loadPlayerNameMap = this.loadPlayerNameMap.bind(this);

        // state init
        this.state = { page: "nextPlayerTurn", sessionKey: null, playerMapLoaded: true };

        // loads PageComponent Map
        this.reloadPageComponentState();
    }

    reloadPageComponentState() {
        pageComponentMap.set("numPlayerSelect", <NumPlayerSelect changePage={this.changePage} setNumPlayers={this.setNumPlayers} generateSesionKey={this.generateSesionKey} />);
        pageComponentMap.set("caseSetup", <CaseSetup changePage={this.changePage} checkSetupComplete={this.checkSetupComplete} loadPlayerNameMap={this.loadPlayerNameMap} />);
        pageComponentMap.set("nextPlayerSetup", <NextPlayerSetup changePage={this.changePage} nextPlayer={this.nextPlayer} />);
        pageComponentMap.set("nextPlayerTurn", <NextPlayerTurn playerMapLoaded={this.state.playerMapLoaded} changePage={this.changePage} nextPlayer={this.nextPlayer} />);

        this.forceUpdate();
    }

    changePage(name) {
        this.setState({ page: name });
    }

    generateSesionKey() {
        fetch(`${SERVER_ADDR}key`, { mode: 'cors' })
            .then(res => res.json())
            .then(result => {
                this.setState({ sessionKey: result });
                SESSION_KEY = result;
            });
        
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

    checkSetupComplete() {
        return (CURRENT_PLAYER >= this.numPlayers - 1)
    }

    async loadPlayerNameMap() {
        this.setState({ playerMapLoaded: false });
        this.reloadPageComponentState();
        let id = 0;

        while (id < this.numPlayers) {
            const Response = await fetch(`${SERVER_ADDR}name`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session: SESSION_KEY, id: id })
            });

            const name = await Response.json();

            console.log(`Received ${name} for ${id}`);
            playerNameMap.set(id, name);
            id++;
        }

        this.setState({ playerMapLoaded: true });
        this.reloadPageComponentState();
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