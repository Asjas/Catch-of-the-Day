import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Inventory from './Inventory.jsx';
import Order from './Order.jsx';
import Fish from './Fish.jsx';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentDidMount() {
    // reinstate localStorage
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId, this.state.order);

    if (localStorageRef) {
      this.setState(() => ({ order: JSON.parse(localStorageRef) }));
    }

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
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

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = updatedFish;

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

  deleteOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState(() => ({ fishes: sampleFishes }));
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
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
        <Order fishes={this.state.fishes} order={this.state.order} deleteOrder={this.deleteOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
