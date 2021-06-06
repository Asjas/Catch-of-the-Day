import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getFunName } from "../helpers";

function StorePicker() {
  const myInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const goToStore = (event: FormEvent<HTMLFormElement>) => {
    // Prevent form from submitted
    event.preventDefault();
    // Get input
    const storeName = myInput.current?.value ?? "";

    // Change the page to /store/:id
    navigate(`/store/${storeName}`, { replace: true });
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
