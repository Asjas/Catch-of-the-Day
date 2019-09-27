import React from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers.js';

const StorePicker = ({ history }) => {
  const myInput = React.createRef();

  const goToStore = event => {
    // Prevent form from submitted
    event.preventDefault();
    // Get input
    const storeName = myInput.current.value;
    // Change the page to /store/:id
    history.push(`/store/${storeName}`);
  };

  return (
    <form action="" className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter a Store</h2>
      <input type="text" placeholder="Store Name" required ref={myInput} defaultValue={getFunName()} />
      <button type="submit">Visit Store</button>
    </form>
  );
};

StorePicker.propTypes = {
  history: PropTypes.object,
};

export default StorePicker;
