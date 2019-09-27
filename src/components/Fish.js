import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

const Fish = ({ addToOrder, index, details: { image, name, desc, price, status } }) => {
  const isAvailable = status === 'available';
  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">{name}</h3>
      <span className="price">{formatPrice(price)}</span>
      <p>{desc}</p>
      <button
        onClick={() => {
          addToOrder(index);
        }}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Add To Order' : 'Sold Out!'}
      </button>
    </li>
  );
};

Fish.propTypes = {
  addToOrder: PropTypes.func,
  index: PropTypes.number,
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
};

export default Fish;
