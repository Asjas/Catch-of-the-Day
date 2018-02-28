import React from 'react';
import Header from './Header.jsx';
import Inventory from './Inventory.jsx';
import Order from './Order.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Wes is cool" />
        </div>
        <Inventory />
        <Order />
      </div>
    );
  }
}

export default App;
