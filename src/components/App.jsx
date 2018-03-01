import React from 'react';
import Header from './Header.jsx';
import Inventory from './Inventory.jsx';
import Order from './Order.jsx';
import Fish from './Fish.jsx';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {},
    };

    this.addFish = this.addFish.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
  }

  addFish(fish) {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add our new fish to the object
    fishes[`fish${Date.now()}`] = fish;
    // Set the new state
    this.setState({ fishes });
  }

  loadSampleFishes() {
    const fishes = { ...this.state.fishes };
    this.setState({ fishes: sampleFishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
