import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import './App.css';

const pageComponentMap = new Map();

class NumPlayerSelect extends React.Component {
    render() {
        return (
            <div className="numSelectButtons">
                <h3> Select Number of Players: </h3>
                <ButtonGroup>
                    <Button
                        color="primary"
                    >
                        3
                    </Button>
                    <Button
                        color="primary"
                    >
                        4
                    </Button>
                    <Button
                        color="primary"
                    >
                        5
                    </Button>
                    <Button
                        color="primary"
                    >
                        6
                    </Button>
                    </ButtonGroup>
                </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        // loads PageComponent Map
        pageComponentMap.set("numPlayerSelect", <NumPlayerSelect />);

        // state init
        this.state = { page: "numPlayerSelect", sessionKey: null };
    }

    generateSesionKey() {
        // get a session key
        this.setState({ sessionKey: "" });
    }

    render() {
        return pageComponentMap.get(this.state.page);
    }
}


export default App;