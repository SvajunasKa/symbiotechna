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
      ships: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://swapi.co/api/starships')
      .then(res => {
        this.setState({ships: res.data.results, loading: false});
      })
  }



  render() {
    return (
      <div className="App">
        <Header/>
        {this.state.ships.length === 0 ? (
         <Spinner/>
        ) :  (
          <Table data={this.state.ships}/>
        )}
      </div>
    );
  }
}

export default App;
