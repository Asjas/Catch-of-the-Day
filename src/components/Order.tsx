import { TransitionGroup, CSSTransition } from "react-transition-group";

import { formatPrice } from "../helpers";

interface Fish {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
}

type OrderProps = {
  fishes: [Fish];
  order: [any];
  deleteOrder(id: string): void;
};

function Order({ fishes, order, deleteOrder }: OrderProps) {
  function renderOrder(key: string) {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === "available";
    // make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
          <li key={key}>
            Sorry
            {fish ? fish.name : "fish"}
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
            lbs {fish.name} {formatPrice(count * fish.price)}
            <button type="button" onClick={() => deleteOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  }

  const orderIds = Object.keys(order);

  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === "available";

    if (isAvailable) {
      return prevTotal + count * fish.price;
    }

    return prevTotal;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup className="order">{orderIds.map(renderOrder)}</TransitionGroup>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
}

export default Order;
