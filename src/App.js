import React from 'react';
import { ButtonGroup, Button, Navbar, NavbarBrand, NavbarText, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';

const pageComponentMap = new Map();
const playerNameMap = new Map();

const pollData = new Map();
let pollTarget = null;

const accuseData = new Map();

// ----------- DEV TEMP -----------
// playerNameMap.set(0, "Adam");
// --------------------------------

const SERVER_ADDR = "http://127.0.0.1:5000/"

let CURRENT_PLAYER = 0;
let SESSION_KEY = null;
let NUM_PLAYERS = null;

const victims = [
    "Nora Perez",
    "Emmett Parker",
    "Arturo Elliot",
    "Scott Walters",
    "Estelle Woods",
    "Warren Fisher",
    "Earl Daniels",
    "Stephanie McBride",
    "Gregg Washington"
]

const weapons = [
    "Hammer",
    "Pistol",
    "Sword",
    "Rock",
    "Dart",
    "Dagger",
    "Bat",
    "Rifle",
    "Battle Axe"
]

const locations = [
    "Shed",
    "Pool",
    "Shooting Range",
    "Kitchen",
    "Library",
    "Office",
    "Storage Room",
    "Theater",
    "Workshop"
]

// ----------------------- Util -----------------------

function generateOptions(optionStrings) {
    const options = []

    for (let i = 0; i < optionStrings.length; i++) {
        options.push(
            <option key={i} value={optionStrings[i]}>
                {optionStrings[i]}
            </option>
            )
    }

    return options;
}

class BackBtn extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.back = this.back.bind(this);
    }

    back() {
        this.props.changePage(this.props.prevPage);
    }

    render() {
        return (
            <Button
                className="backBtn"
                color="primary"
                onClick={this.back}
            >
                Back
            </Button>
        )
    }
}

// ----------------------- Headers -----------------------

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


// ----------------------- Game Setup -----------------------

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
            <div>
                <BackBtnLinked />
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
        this.info.set('tokens', NUM_PLAYERS > 4 ? 3 : 2);

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

                if (this.props.checkSetupComplete()) {
                    this.props.loadPlayerNameMap();
                    this.props.nextPlayer();
                    this.props.changePage("nextPlayerTurn");
                } else {
                    this.props.changePage("nextPlayerSetup");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateInfo(e) {
        this.info.set(e.target.id, e.target.value);
    }

    render() {
        return (
            <Form>
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
                        {generateOptions(victims)}
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
                        <option selected hidden />
                        {generateOptions(weapons)}
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
                        {generateOptions(locations)}
                    </Input>
                </FormGroup>
                <Button
                    className="caseSubmit"
                    color='primary'
                    onClick={this.submitCaseInfo}
                >
                    Submit
                </Button>
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


// ----------------------- Main Loop -----------------------

class NextPlayerTurn extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.nextPlayer = this.nextPlayer.bind(this);
    }

    nextPlayer() {
        this.props.changePage("playerActionSelect");
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
            );
        } else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

class PlayerActionSelect extends React.Component {
    constructor(props) {
        super(props)

        // binding
        this.startPoll = this.startPoll.bind(this);
        this.startAccuse = this.startAccuse.bind(this);
        this.endTurn = this.endTurn.bind(this);
    }

    startPoll() {
        this.props.changePage("poll");
    }

    startAccuse() {
        this.props.changePage("accuse");
    }

    endTurn() {
        this.props.changePage("endTurnConfirm");
    }

    render() {
        return (
            <div className="actionSelect">
                <h4 className="actionSelectName"> {playerNameMap.get(CURRENT_PLAYER)} </h4>
                <h1> Actions </h1>
                <Button
                    className="actionBtn"
                    color="primary"
                    onClick={this.startPoll}
                >
                    Poll
                </Button>
                <Button
                    className="actionBtn"
                    color="primary"
                    onClick={this.startAccuse}
                >
                    Accuse
                </Button>
                <Button
                    className="actionBtn"
                    color="primary"
                    onClick={this.endTurn}
                >
                    End Turn
                </Button>
            </div>
        );
    }
}


// ----------------------- Poll -----------------------

class Poll extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.setData = this.setData.bind(this);
    }

    setData(e) {
        console.log(`setting data: ${e.target.value}`);

        pollData.clear();
        pollData.set('type', e.target.value);
        this.props.changePage("pollTag");
    }
    
    render() {
        return (
            <div>
                <BackBtn changePage={this.props.changePage} prevPage="playerActionSelect"/>
                <div className="poll">
                    <Button
                        className="pollTypeBtn"
                        color="primary"
                        value="weapon"
                        onClick={this.setData}
                    >
                        Weapon
                    </Button>
                    <Button
                        className="pollTypeBtn"
                        color="primary"
                        value="location"
                        onClick={this.setData}
                    >
                        Location
                    </Button>
                    <Button
                        className="pollTypeBtn"
                        color="primary"
                        value="victim"
                        onClick={this.setData}
                    >
                        Victim
                    </Button>
                </div>
            </div>
        )
    }
}

class PollTag extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.setData = this.setData.bind(this);

        // tag hardcodes
        this.tagMap = new Map();
        this.tagMap.set('weapon', ['One-Handed', 'Ranged', 'Two-Handed', 'Sharp', 'Quick', 'Blunt']);
        this.tagMap.set('location', ['Exterior', 'Core', 'Interior', 'Leisure', 'Underground', 'Occupational']);
        this.tagMap.set('victim', ['Retired', 'Lower-Class', 'Student', 'Middle-Class', 'Working', 'Upper-Class']);
    }

    setData(e) {
        pollData.set('tag', e.target.value);

        this.props.changePage("pollExclude");
    }

    render() {
        console.log(pollData);
        const type = pollData.get('type');
        if (type === null) {
            return (
                <div>
                    <BackBtn changePage={this.props.changePage} prevPage="playerActionSelect" />
                    <div className="pollTagLoading">
                        Loading...
                    </div>
                </div>
            );
        }
        return (
            <div>
                <BackBtn changePage={this.props.changePage} prevPage="poll" />
                <Container className="pollTag">
                    <Row xs='2' className="pollTagRow">
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[0].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[0]}
                            </Button>
                        </Col>
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[1].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[1]}
                            </Button>
                        </Col>
                    </Row>
                    <Row xs='2' className="pollTagRow">
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[2].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[2]}
                            </Button>
                        </Col>
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[3].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[3]}
                            </Button>
                        </Col>
                    </Row>
                    <Row xs='2' className="pollTagRow">
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[4].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[4]}
                            </Button>
                        </Col>
                        <Col className="tagBtnCol" >
                            <Button
                                color='primary'
                                value={this.tagMap.get(type)[5].toLowerCase()}
                                onClick={this.setData}
                            >
                                {this.tagMap.get(type)[5]}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

class PollExclude extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = {selected: [], tokens: null, error: false}

        // bindings
        this.setData = this.setData.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.generatePlayerBtns = this.generatePlayerBtns.bind(this);
    }

    componentDidMount() {
        if (NUM_PLAYERS <= 3) {
            this.setData();
        } else {
            fetch(`${SERVER_ADDR}token`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER })
            })
                .then(async (res) => {
                    const response = await res.json();
                    console.log(`Received token count: ${response}`);
                    console.log(response);
                    if (response === 0) {
                        this.setData();
                    } else {
                        this.setState({ tokens: response });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    setData() {
        if (NUM_PLAYERS - (this.state.selected.length + 1) < 2) {
            this.setState({ error: true });
        } else {
            if (this.state.selected.length > 0) {
                fetch(`${SERVER_ADDR}poll-exclude`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER, selected: this.state.selected })
                })
                    .catch(err => {
                        console.log(err);
                    });
            }

            pollData.set('excluded', this.state.selected);
            pollData.set('anon', 0);
            pollTarget = CURRENT_PLAYER;

            do {
                this.props.nextPlayer();
            } while (pollData.get('excluded').includes(CURRENT_PLAYER));

            this.props.changePage('nextPlayerPoll');
        }
    }

    updateSelected(e) {
        let newSel;
        if (this.state.selected.includes(parseInt(e.target.value))) {
            newSel = this.state.selected.filter((value, index, arr) => {
                return value !== parseInt(e.target.value);
            })
        } else {
            newSel = this.state.selected;
            newSel.push(parseInt(e.target.value));
        }
        this.setState({ selected: newSel });
    }

    generatePlayerBtns() {
        let btns = []

        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (i !== CURRENT_PLAYER) {
                if (this.state.selected.includes(i)) {
                    btns.push(
                        <Button
                            className='playerExcludeBtn'
                            color="primary"
                            value={i}
                            onClick={this.updateSelected}
                        >
                            {playerNameMap.get(i)}
                        </Button>
                    );
                } else {
                    btns.push(
                        <Button
                            className='playerExcludeBtn'
                            color="primary"
                            outline
                            value={i}
                            onClick={this.updateSelected}
                        >
                            {playerNameMap.get(i)}
                        </Button>
                    );
                }
            }
        }

        return btns;
    }

    render() {
        if (this.state.tokens === null) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div>
                    <BackBtn changePage={this.props.changePage} prevPage="playerActionSelect" />
                    <div className="pollExclude">
                        <h2> Select Players to Exclude </h2>
                        <p> You may choose to exclude no one </p>
                        <p> It costs 1 Corruption token to exclude any number of players </p>
                        <p> You have {this.state.tokens} Corruption tokens remaining </p>
                        {this.state.error ? (<p className='err'> You must poll at least two people </p>) : null}
                        {this.generatePlayerBtns()}
                        <Button
                            className='excludeSubmitBtn'
                            color='primary'
                            onClick={this.setData}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )
        }
    }
}

class NextPlayerPoll extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.next = this.next.bind(this);
    }

    next() {
        if (CURRENT_PLAYER === pollTarget) {
            this.props.changePage('pollDisplay');
        } else {
            this.props.changePage('playerAnon');
        }
    }

    render() {
        return (
            <div className="nextPlayerPoll">
                <h4> Pass to </h4>
                <h1> {playerNameMap.get(CURRENT_PLAYER)} </h1>
                <Button
                    className="nextPlayerPollBtn"
                    color="primary"
                    onClick={this.next}
                >
                    Next
                    </Button>
            </div>
        )
    }
}

class PlayerAnon extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = { tokens: null }

        // binding
        this.nextPlayer = this.nextPlayer.bind(this);
        this.confirm = this.confirm.bind(this);
        this.generateYesBtn = this.generateYesBtn.bind(this);
    }

    componentDidMount() {
        fetch(`${SERVER_ADDR}token`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER })
        })
            .then(async (res) => {
                const response = await res.json();
                console.log(`Received token count: ${response}`);
                console.log(response);
                this.setState({ tokens: response });
            })
            .catch(err => {
                console.log(err);
            });
    }

    confirm() {
        const anon = pollData.get('anon');
        pollData.set('anon', anon + 1);

        fetch(`${SERVER_ADDR}token-remove`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER })
        })
            .then(response => {
                console.log(`Removed token from player`);
            })
            .catch(err => {
                console.log(err);
            });

        this.nextPlayer();
    }

    generateYesBtn() {
        if (this.state.tokens > 0) {
            return (
                <Button
                    className="confirmBtn"
                    color="primary"
                    onClick={this.confirm}
                >
                    Yes
                </Button>
            )
        } else {
            return (
                <Button
                    className="confirmBtn"
                    color="primary"
                    disabled
                    onClick={this.confirm}
                >
                    Yes
                </Button>
            )
        }
    }

    nextPlayer() {
        do {
            this.props.nextPlayer();
        } while (pollData.get('excluded').includes(CURRENT_PLAYER));

        this.props.changePage('nextPlayerPoll');
    }

    render() {
        if (this.state.tokens === null) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div className="playerAnon">
                    <h1> You have {this.state.tokens} Corruption Tokens Left </h1>
                    <h3> Would you like to Corrupt your answer? </h3>
                    <Row xs='2' className='confirmBtnRow'>
                        <Button
                            className="confirmBtn"
                            color="primary"
                            onClick={this.nextPlayer}
                        >
                            No
                        </Button>
                        {this.generateYesBtn()}
                    </Row>
                </div>
            )
        }
    }
}

class PollDisplay extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = { data: null }

        // binding
        this.nextTurn = this.nextTurn.bind(this);
    }

    componentDidMount() {
        fetch(`${SERVER_ADDR}poll`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER, type: pollData.get('type'), tag: pollData.get('tag') })
        })
            .then(res => res.json())
            .then(response => {
                console.log("Data Received");
                console.log(response);
                this.setState({ data: response });
            }).catch(err => {
                console.log(err);
            });
    }

    nextTurn() {
        this.props.nextPlayer();
        this.props.changePage("nextPlayerTurn");
    }

    render() {
        if (this.state.data == null) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div className='pollDisplay'>
                    <h2> Poll Results </h2>
                    <Row className='dataRow'>
                        Yes: {this.state.data}
                    </Row>
                    <Row className='dataRow'>
                        No: {NUM_PLAYERS - (this.state.data + pollData.get('anon') + pollData.get('excluded').length + 1)}
                    </Row>
                    <Row className='dataRow'>
                        ???: {pollData.get('anon')}
                    </Row>

                    <Button
                        color='primary'
                        onClick={this.nextTurn}
                    >
                        End Turn
                    </Button>
                </div>
            )
        }
    }
}


// ----------------------- Accuse -----------------------

class Accuse extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.generatePlayerOptions = this.generatePlayerOptions.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        accuseData.clear();
    }

    generatePlayerOptions() {
        let options = []

        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (i !== CURRENT_PLAYER) {
                options.push(
                    <option value={i}>
                        {playerNameMap.get(i)}
                    </option>
                    )
            }
        }

        return options;
    }

    updateInfo(e) {
        accuseData.set(e.target.id, e.target.value);
    }

    nextPage() {
        this.props.changePage("accuseDisplay");
    }

    render() {
        return (
            <div>
                <BackBtn changePage={this.props.changePage} prevPage="playerActionSelect" />
                <div className="accuse">
                    <h1> Accuse </h1>
                    <Form>
                        <FormGroup className="accuseInput">
                            <Label for="player">
                                Player
                            </Label>
                            <Input
                                id="player"
                                name="Accuse Player"
                                type="select"
                                onChange={this.updateInfo}
                            >
                                <option selected hidden />
                                {this.generatePlayerOptions()}
                            </Input>
                        </FormGroup>
                        <FormGroup className="accuseInput">
                            <Label for="color">
                                Color
                            </Label>
                            <Input
                                id="color"
                                name="Accuse Color"
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
                        <FormGroup className="accuseInput">
                            <Label for='ev1'>
                                Evidence 1
                            </Label>
                            <Input
                                id="ev1"
                                name="Accuse Evidence 1"
                                type="select"
                                onChange={this.updateInfo}
                            >
                                <option selected hidden />
                                <optgroup>
                                    {generateOptions(victims)}
                                </optgroup>
                                <optgroup>
                                    {generateOptions(weapons)}
                                </optgroup>
                                <optgroup>
                                    {generateOptions(locations)}
                                </optgroup>
                            </Input>
                        </FormGroup>
                        <FormGroup className="accuseInput">
                                <Label for='ev2'>
                                    Evidence 2
                            </Label>
                                <Input
                                    id="ev2"
                                    name="Accuse Evidence 2"
                                    type="select"
                                    onChange={this.updateInfo}
                                >
                                    <option selected hidden />
                                    <optgroup>
                                        {generateOptions(victims)}
                                    </optgroup>
                                    <optgroup>
                                        {generateOptions(weapons)}
                                    </optgroup>
                                    <optgroup>
                                        {generateOptions(locations)}
                                    </optgroup>
                                </Input>
                        </FormGroup>
                        <Button
                            color='primary'
                            onClick={this.nextPage}
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

class AccuseDisplay extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = {correct: null, first: null}

        // bindings
        this.generateResponse = this.generateResponse.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        fetch(`${SERVER_ADDR}accuse`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY, id: CURRENT_PLAYER, player: accuseData.get('player'), color: accuseData.get('color'), ev1: accuseData.get('ev1'), ev2: accuseData.get('ev2') })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ correct: response.correct, first: response.first });
            }).catch(err => {
                console.log(err);
            });
    }

    generateResponse() {
        let resp = []

        const targetName = playerNameMap.get(parseInt(accuseData.get('player')));

        resp.push(<p> You Accused {targetName} of being {accuseData.get('color')}. </p>);

        if (this.state.correct) {
            resp.push(<p className="correct"> You are Correct </p>)
            if (this.state.first) {
                resp.push(<p className="correct"> You are the first to correctly accuse this player </p>);
            } else {
                resp.push(<p className="incorrect"> You are not the first to correctly accuse this player </p>);
            }
        } else {
            resp.push(<p className="incorrect"> You are Incorrect </p>);
        }

        return resp;
    }

    next() {
        
        this.props.changePage("accuseEndGame");
    }

    render() {
        if (this.state.correct === null || this.state.first === null) {
            return (
                <div>
                    <BackBtn changePage={this.props.changePage} prevPage="accuse" />
                    <div className="accuseDisplay">
                        Loading...
                    </div>
                </div>
            )
        } else {
            return (
                <div className="accuseDisplay">
                    <h1> Accuse </h1>
                    {this.generateResponse()}
                    <Button
                        className='endTurnBtn'
                        color='primary'
                        onClick={this.next}
                    >
                        Next
                    </Button>
                </div>
            )
        }
    }
}

class AccuseEndGame extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.confirm = this.confirm.bind(this);
        this.endTurn = this.endTurn.bind(this);
    }

    confirm() {
        this.props.changePage("endOfGame");
    }

    endTurn() {
        this.props.nextPlayer();
        this.props.changePage("nextPlayerTurn");
    }

    render() {
        return (
            <div>
                <BackBtn changePage={this.props.changePage} prevPage="accuseDisplay" />
                <div className="accuseEndGame">
                    <h2> Would you like to check for End of Game? </h2>
                    <Row xs='2' className='confirmBtnRow'>
                        <Button
                            className="confirmBtn"
                            color="primary"
                            onClick={this.endTurn}
                        >
                            No
                        </Button>
                        <Button
                            className="confirmBtn"
                            color="primary"
                            onClick={this.confirm}
                        >
                            Yes
                        </Button>
                    </Row>
                </div>
            </div>
        )
    }
}


// ----------------------- End of Game -----------------------

class EndofGame extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = { result: null };

        // bindings
        this.endTurn = this.endTurn.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    componentDidMount() {
        fetch(`${SERVER_ADDR}check-end`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY })
        })
            .then(res => res.json())
            .then(response => {
                if (response === {}) {
                    console.log("Received null for End Game check");
                } else if (response === true) {
                    this.endGame();
                } else {
                    this.setState({ result: response });
                }
            }).catch(err => {
                console.log(err);
            });
    }

    endTurn() {
        this.props.nextPlayer();
        this.props.changePage("nextPlayerTurn");
    }

    endGame() {
        this.props.changePage("endGameDisplay");
    }

    render() {
        if (this.state.result === null) {
            return (
                <div>
                    <BackBtn changePage={this.props.changePage} prevPage="accuseEndGame" />
                    <div className="endOfGame">
                        Loading...
                    </div>
                </div>
            )
        } else {
            return (
                <div className="endOfGame">
                    <h5> There is not enough cases solved to end the game </h5>
                    <p> Correctly accuse more players to end the game! </p>
                    <Button
                        color="primary"
                        onClick={this.endTurn}
                    >
                        End Turn
                    </Button>
                </div>
            )
        }
    }
}

function MainMenuBtn() {
    const navigate = useNavigate();

    function handleNav() {
        navigate("/");
    }

    return (
        <Button
            className='returnMenuBtn'
            color='primary'
            onClick={() => handleNav()}
        >
            Main Menu
        </Button>
    )
}

class EndGameDisplay extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = { data: null };

        // bindings
        this.generatePlayerReports = this.generatePlayerReports.bind(this);
    }

    componentDidMount() {
        fetch(`${SERVER_ADDR}end`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY })
        })
            .then(res => res.json())
            .then(response => {
                console.log("End Game Data Received");
                console.log(response);
                this.setState({ data: response });
            }).catch(err => {
                console.log(err);
            });
    }

    generatePlayerReports() {
        const reports = [];

        for (let i = 0; i < NUM_PLAYERS; i++) {
            const pData = this.state.data[i];
            const pSolves = pData['solves']
            let solved = "Cases Solved: "
            for (let i = 0; i < pSolves.length; i++) {
                solved += pSolves[i]['color'];
                if (pSolves[i]['first']) {
                    solved += " (first)";
                }
                if (i + 1 !== pSolves.length) {
                    solved += ", ";
                }
            }

            reports.push(
                <div className="playerReport">
                    <p><b>{playerNameMap.get(i)}: </b> <br />
                    Crime: {pData['color']} <br />
                    First Solved By: {pData['solved_by'] === -1 ? "[NONE]" : playerNameMap.get(parseInt(pData['solved_by']))}</p>
                    <hr />
                    <p>Incorrect Guesses: {pData['penalties']} <br />
                    {solved}</p>
                </div>
            )
        }

        return reports;
    }

    render() {
        if (this.state.data === null) {
            return (
                <div>
                    <div className="endGameDisplay">
                        Loading End Game...
                    </div>
                </div>
            )
        } else {
            return (
                <div className="endGameDisplay">
                    <h1> Game Over </h1>
                    {this.generatePlayerReports()}
                    <MainMenuBtn />
                </div>
            )
        }
    }
}


// ----------------------- End Turn -----------------------

class EndTurnConfirm extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.confirm = this.confirm.bind(this);
        this.back = this.back.bind(this);
    }

    confirm() {
        this.props.changePage("nextPlayerTurn");
        this.props.nextPlayer();
    }

    back() {
        this.props.changePage("playerActionSelect");
    }

    render() {
        return (
            <div className="endTurnConfirmation">
                <h3> Are you sure you want <br /> to end your turn? </h3>
                <Button
                    className="confirmBtn"
                    color="primary"
                    onClick={this.confirm}
                >
                    Yes
                </Button>
                <Button
                    className="confirmBtn"
                    color="primary"
                    onClick={this.back}
                >
                    No
                </Button>
            </div>
        )
    }
}


// ----------------------- Load Game -----------------------

function BackBtnLinked() {
    const navigate = useNavigate();

    function handleNav() {
        navigate("/");
    }

    return (
        <Button
            className='backBtn'
            color='primary'
            onClick={() => handleNav()}
        >
            Back
        </Button>
    )
}

class LoadGame extends React.Component {
    constructor(props) {
        super(props);

        // state
        this.state = {session: null}

        // bindings
        this.updateInfo = this.updateInfo.bind(this);
        this.loadGame = this.loadGame.bind(this);
    }

    updateInfo(e) {
        this.setState({ session: e.target.value });
    }

    loadGame() {
        SESSION_KEY = this.state.session;

        fetch(`${SERVER_ADDR}load`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: SESSION_KEY })
        })
            .then(res => res.json())
            .then(response => {
                console.log("Game Data Received");
                console.log(response);
                this.props.setNumPlayers(response['numPlayers']);
                this.props.loadPlayerNameMap();
                CURRENT_PLAYER = 0;
                this.props.changePage('nextPlayerTurn');
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <BackBtnLinked />
                <div className='loadGame'>
                    <Form>
                        <FormGroup className="loadInput">
                            <Label for="session">
                                Session Key
                            </Label>
                            <Input
                                id="session"
                                name="Session Key"
                                placeholder="Enter Session Key"
                                type="text"
                                onChange={this.updateInfo}
                            />
                        </FormGroup>
                        <FormGroup className="loadSubmit">
                            <Button
                                className="caseSubmitBtn"
                                color='primary'
                                onClick={this.loadGame}
                            >
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}


// ----------------------- Main -----------------------

class App extends React.Component {
    constructor(props) {
        super(props);

        // binding
        this.reloadPageComponentState = this.reloadPageComponentState.bind(this);
        this.changePage = this.changePage.bind(this);
        this.generateSesionKey = this.generateSesionKey.bind(this);
        this.setNumPlayers = this.setNumPlayers.bind(this);
        this.nextPlayer = this.nextPlayer.bind(this);
        this.checkSetupComplete = this.checkSetupComplete.bind(this);
        this.loadPlayerNameMap = this.loadPlayerNameMap.bind(this);

        // state init
        if (this.props.load) {
            this.state = { page: "loadGame", sessionKey: null, playerMapLoaded: false };
        } else {
            this.state = { page: "numPlayerSelect", sessionKey: null, playerMapLoaded: false };
        }

        // loads PageComponent Map
        this.reloadPageComponentState();
    }

    reloadPageComponentState() {

        // setup pages
        pageComponentMap.set("numPlayerSelect", <NumPlayerSelect changePage={this.changePage} setNumPlayers={this.setNumPlayers} generateSesionKey={this.generateSesionKey} />);
        pageComponentMap.set("caseSetup", <CaseSetup changePage={this.changePage} checkSetupComplete={this.checkSetupComplete} loadPlayerNameMap={this.loadPlayerNameMap} nextPlayer={this.nextPlayer} />);
        pageComponentMap.set("nextPlayerSetup", <NextPlayerSetup changePage={this.changePage} nextPlayer={this.nextPlayer} />);
        pageComponentMap.set("loadGame", <LoadGame changePage={this.changePage} setNumPlayers={this.setNumPlayers} loadPlayerNameMap={this.loadPlayerNameMap} />)

        // main loop
        pageComponentMap.set("nextPlayerTurn", <NextPlayerTurn playerMapLoaded={this.state.playerMapLoaded} changePage={this.changePage} />);
        pageComponentMap.set("playerActionSelect", <PlayerActionSelect changePage={this.changePage} />);
        pageComponentMap.set("endTurnConfirm", <EndTurnConfirm changePage={this.changePage} nextPlayer={this.nextPlayer} />);

        // polling
        pageComponentMap.set("poll", <Poll changePage={this.changePage} />);
        pageComponentMap.set("pollTag", <PollTag changePage={this.changePage} />);
        pageComponentMap.set("pollExclude", <PollExclude changePage={this.changePage} nextPlayer={this.nextPlayer} />)
        pageComponentMap.set('nextPlayerPoll', <NextPlayerPoll changePage={this.changePage} />)
        pageComponentMap.set('playerAnon', <PlayerAnon changePage={this.changePage} nextPlayer={this.nextPlayer} />)
        pageComponentMap.set('pollDisplay', <PollDisplay changePage={this.changePage} nextPlayer={this.nextPlayer} />)

        // accuse
        pageComponentMap.set("accuse", <Accuse changePage={this.changePage} />);
        pageComponentMap.set("accuseDisplay", <AccuseDisplay changePage={this.changePage} />)
        pageComponentMap.set("accuseEndGame", <AccuseEndGame changePage={this.changePage} nextPlayer={this.nextPlayer} />)

        // game end
        pageComponentMap.set("endOfGame", <EndofGame changePage={this.changePage} nextPlayer={this.nextPlayer} />);
        pageComponentMap.set("endGameDisplay", <EndGameDisplay />)

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
            console.log(`Set number of players: ${parsed}`);
            NUM_PLAYERS = parsed;
        } else {
            throw new Error("Number of Players is Not a Number");
        }
    }

    nextPlayer() {
        let nextPlayerNum = CURRENT_PLAYER + 1;
        if (nextPlayerNum >= NUM_PLAYERS) {
            nextPlayerNum = 0;
        }
        CURRENT_PLAYER = nextPlayerNum;
    }

    checkSetupComplete() {
        return (CURRENT_PLAYER >= NUM_PLAYERS - 1)
    }

    async loadPlayerNameMap() {
        this.setState({ playerMapLoaded: false });
        this.reloadPageComponentState();
        let id = 0;

        while (id < NUM_PLAYERS) {
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