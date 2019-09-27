import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../helpers';

const Order = ({ fishes, order, deleteOrder }) => {
  const renderOrder = key => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    // make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
          <li key={key}>
            Sorry
            {fish ? fish.name : 'fish'}
            is no longer available
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs
            {' '}
            {fish.name}
            {' '}
            {formatPrice(count * fish.price)}
            <button onClick={() => deleteOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';

    if (isAvailable) {
      return prevTotal + count * fish.price;
    }

    return prevTotal;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishes: PropTypes.object,
  order: PropTypes.object,
  deleteOrder: PropTypes.func,
};

export default Order;
