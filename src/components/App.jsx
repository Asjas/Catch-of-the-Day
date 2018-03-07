import React from 'react';
import Header from './Header.jsx';
import Inventory from './Inventory.jsx';
import Order from './Order.jsx';
import Fish from './Fish.jsx';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add our new fish to the object
    fishes[`fish${Date.now()}`] = fish;
    // Set the new state
    this.setState(() => ({ fishes }));
  };

  addToOrder = key => {
    // Take copy of state
    const order = { ...this.state.order };
    // Add to order or update number
    order[key] = order[key] + 1 || 1;
    // Add to state
    this.setState(() => ({ order }));
  };

  loadSampleFishes = () => {
    this.setState(() => ({ fishes: sampleFishes }));
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
