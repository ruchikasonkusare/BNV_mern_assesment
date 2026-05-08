import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListPage from "./pages/ListPage";
import AddEditPage from "./pages/AddEditpage";
import ViewPage from "./pages/VIewPage";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/"         element={<ListPage />} />
          <Route path="/add"      element={<AddEditPage />} />
          <Route path="/edit/:id" element={<AddEditPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;