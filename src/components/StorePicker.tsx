import { FormEvent, useRef } from "react";

import { getFunName } from "../helpers";

type StorePickerProps = {
  history: History;
};

function StorePicker({ history }: StorePickerProps) {
  const myInput = useRef<HTMLInputElement>(null);

  const goToStore = (event: FormEvent<HTMLFormElement>) => {
    // Prevent form from submitted
    event.preventDefault();
    // Get input
    const storeName = myInput.current?.value ?? "";
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
}

export default StorePicker;
