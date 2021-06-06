import { formatPrice } from "../helpers";

import type { FishProps } from "../types";

function Fish({ addToOrder, index, details: { image, name, desc, price, status } }: FishProps) {
  const isAvailable = status === "available";

  function handleClick() {
    addToOrder(index);
  }

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">{name}</h3>
      <span className="price">{formatPrice(price)}</span>
      <p>{desc}</p>
      <button type="button" onClick={handleClick} disabled={!isAvailable}>
        {isAvailable ? "Add To Order" : "Sold Out!"}
      </button>
    </li>
  );
}

export default Fish;
