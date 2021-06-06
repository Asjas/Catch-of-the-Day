import { useState, useEffect, useCallback } from "react";

import Login from "./Login";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

import type { InventoryProps } from "../types";
import { firebase } from "../firebase";

function Inventory({ fishes, addFish, updateFish, deleteFish, loadSampleFishes, storeId }: InventoryProps) {
  const [state, setState] = useState({ uid: null, owner: "" });

  const authHandler = useCallback(
    (authData: any) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const { uid } = user;
          void firebase.database().ref(`${storeId}/owner`).update({ data: uid });
          setState({
            uid: authData.user.uid,
            owner: user.uid,
          });
        } else {
          setState({
            uid: null,
            owner: "",
          });
        }
      });
    },
    [storeId],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        void authHandler({ user });
      }
    });
  }, [authHandler]);

  async function authenticate(provider: any) {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    await firebase.auth().signInWithPopup(authProvider).then(authHandler);
  }

  async function logout() {
    await firebase.auth().signOut();

    setState({ uid: null, owner: "" });
  }

  const Logout = (
    <button type="button" onClick={logout}>
      Log Out!
    </button>
  );

  // Check if they are logged in
  if (!state.uid) {
    return <Login authenticate={authenticate} />;
  }

  if (state.uid !== state.owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        {Logout}
      </div>
    );
  }

  // Render the inventory
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {Logout}
      {Object.keys(fishes).map((key) => (
        <EditFishForm key={key} index={key} fish={fishes[key]} updateFish={updateFish} deleteFish={deleteFish} />
      ))}
      <AddFishForm addFish={addFish} />
      <button type="button" onClick={loadSampleFishes}>
        Load Sample Fishes
      </button>
    </div>
  );
}

export default Inventory;
