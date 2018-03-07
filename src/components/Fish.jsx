import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, name, desc, price, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}</h3>
        <span className="price">{formatPrice(price)}</span>
        <p>{desc}</p>
        <button
          onClick={() => {
            this.props.addToOrder(this.props.index);
          }}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
