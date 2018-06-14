import React, {Component} from 'react';
import axios from 'axios'

import Spinner from './Components/Spinner/Spinner'
import Table from './Components/Table/Table'
import Header from './Components/Header/Header'
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            ships: [],
            loading: true,
            nextBtnClass: '',
            prevBtnClass: 'hide',
        };
        this.loadNextTable = this.loadNextTable.bind(this);
        this.loadPrevTable = this.loadPrevTable.bind(this);
    }

    componentDidMount() {
        axios.get('https://swapi.co/api/starships')
            .then(response => {
                this.setState({ships: response.data.results, loading: false});
            })
    }

    loadNextTable() {
        this.setState({currentPage: this.state.currentPage + 1, loading: true});
        axios.get('https://swapi.co/api/starships' + '?page=' + (this.state.currentPage + 1))
            .then(response => {
                this.setState({ships: response.data.results, prevBtnClass: 'show', loading: false});
                if (response.data.next == null) {
                    this.setState({'nextBtnClass': 'hide'});
                }
            });
    }

    loadPrevTable() {
        this.setState({currentPage: this.state.currentPage - 1, loading: true});
        axios.get('https://swapi.co/api/starships' + '?page=' + (this.state.currentPage - 1))
            .then(response => {
                this.setState({ships: response.data.results, loading: false, 'nextBtnClass': 'show'});
                if (response.data.previous == null) {
                    this.setState({'prevBtnClass': 'hide'});
                }
            });
    }

    render() {
        let table = <Table data={this.state.ships}/>;
        if (this.state.loading) {
            table = <Spinner/>;
        }
        return (
            <div className="App">
                <Header/>
                {table}
                <div className="container">
                    <button className={`btn default left ${this.state.prevBtnClass}`} onClick={this.loadPrevTable}>
                        Prev
                    </button>
                    <button className={`btn default right ${this.state.nextBtnClass}`} onClick={this.loadNextTable}>
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
