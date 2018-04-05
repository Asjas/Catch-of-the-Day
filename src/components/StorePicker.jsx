import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  myInput = React.createRef();

  goToStore(event) {
    // Prevent form from submitted
    event.preventDefault();
    // Get input
    const storeName = this.myInput.current.value;
    // Change the page to /store/:id
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" placeholder="Store Name" required ref={this.myInput} defaultValue={getFunName()} />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
