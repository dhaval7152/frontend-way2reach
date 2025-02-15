import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import RoleTable from "./components/RoleTable";

function App() {
  return (
    <div className="container">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
