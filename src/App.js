import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import TemplatePage from "./Pages/TemplatePage";
import ProposalBuilder from "./Pages/ProposalBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/template/:id"
          element={<TemplatePage />}
        />

        <Route
          path="/proposal/:templateId"
          element={<ProposalBuilder />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;