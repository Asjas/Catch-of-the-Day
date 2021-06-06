import { BrowserRouter, Routes, Route } from "react-router-dom";

import StorePicker from "./components/StorePicker";
import App from "./components/App";
import NotFound from "./components/NotFound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StorePicker />} />
        <Route path="/store/:storeId" element={<App />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
