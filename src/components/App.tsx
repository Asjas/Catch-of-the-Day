import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";

import { firebase } from "../firebase";
import sampleFishes from "../sample-fishes";

import type { Fish as FishArg } from "../types";

function App() {
  const params = useParams();
  const [state, setState] = useState<any>({ fishes: {}, order: {} });

  // Fetch data from firebase and update local `fishes` state
  useEffect(() => {
    const fishesRef = firebase.database().ref(`${params.storeId}/fishes`);

    fishesRef.on("value", (snapshot) => {
      const data = snapshot.val();

      setState((prevState: any) => ({ ...prevState, fishes: data }));
    });
  }, [params.storeId]);

  // Update firebase data when local `fishes` state is updated
  useEffect(() => {
    const localStorageRef = localStorage.getItem(params.storeId);

    // Restore `order` data from localstorage
    if (localStorageRef) {
      setState((prevState: any) => ({ ...prevState, order: JSON.parse(localStorageRef) }));
    }

    void firebase.database().ref(`${params.storeId}/fishes`).update(state.fishes);
  }, [params.storeId, state.fishes]);

  // Update localstorage when local `order` state is updated
  useEffect(() => {
    localStorage.setItem(params.storeId, JSON.stringify(state.order));
  }, [params.storeId, state.order]);

  function addFish(fish: FishArg) {
    const fishes = { ...state.fishes };

    fishes[`fish${Date.now()}`] = fish;

    setState((prevState: any) => ({ ...prevState, fishes }));
  }

  function updateFish(key: string, updatedFish: FishArg) {
    const fishes = { ...state.fishes };

    fishes[key] = updatedFish;

    setState((prevState: any) => ({ ...prevState, fishes }));
  }

  function addToOrder(key: string) {
    const order = { ...state.order };

    order[key] = order[key] + 1 || 1;

    setState((prevState: any) => ({ ...prevState, order }));
  }

  function deleteOrder(key: string) {
    const order = { ...state.order };
    delete order[key];
    setState((prevState: any) => ({ ...prevState, order }));
  }

  function loadSampleFishes() {
    setState((prevState: any) => ({ ...prevState, fishes: sampleFishes }));
  }

  function deleteFish(key: string) {
    const fishes = { ...state.fishes };
    fishes[key] = null;
    setState((prevState: any) => ({ ...prevState, fishes }));
  }

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(state.fishes).map((key) => (
            <Fish key={key} index={key} details={state.fishes[key]} addToOrder={addToOrder} />
          ))}
        </ul>
      </div>
      <Order fishes={state.fishes} order={state.order} deleteOrder={deleteOrder} />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={state.fishes}
        storeId={params.storeId}
      />
    </div>
  );
}

export default App;
