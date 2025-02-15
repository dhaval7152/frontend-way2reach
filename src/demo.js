/*
MERN APP: Dynamic Role-Based Forms (Frontend: React.js + Bootstrap)
*/

// Install dependencies: react, axios, react-modal, bootstrap

// === FRONTEND STRUCTURE ===

// src/
// ├── components/
// │   ├── Dropdown.js
// │   ├── DynamicForm.js
// │   ├── Modal.js
// ├── pages/
// │   ├── Dashboard.js
// ├── api/
// │   ├── apiService.js
// ├── hooks/
// │   ├── useFetchRoles.js
// ├── context/
// │   ├── RoleContext.js (optional for global state)
// ├── App.js
// ├── index.js

// api/apiService.js
// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";

// export const getRoles = async () => {
//   const response = await axios.get(`${API_BASE_URL}/roles/getRoles`);
//   return response.data;
// };

// export const saveFormData = async (formData) => {
//   const response = await axios.post(`${API_BASE_URL}/forms/saveData`, formData);
//   return response.data;
// };

// hooks/useFetchRoles.js
// import { useState, useEffect } from "react";
// import { getRoles } from "../api/apiService";

// export const useFetchRoles = () => {
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       const data = await getRoles();
//       setRoles(data);
//     };
//     fetchRoles();
//   }, []);

//   return roles;
// };

// components/Dropdown.js
// import React from 'react';

// const Dropdown = ({ options, onChange }) => {
//   return (
//     <select className="form-select" onChange={onChange}>
//       <option value="">Select a role</option>
//       {options.map((option) => (
//         <option key={option.role} value={option.role}>{option.role}</option>
//       ))}
//     </select>
//   );
// };

// export default Dropdown;

// components/DynamicForm.js
// import React, { useState } from 'react';
// import { saveFormData } from '../api/apiService';

// const DynamicForm = ({ role, fields, onClose }) => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await saveFormData({ role, data: formData });
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3">
//       {fields.map((field) => (
//         <div className="mb-3" key={field}>
//           <label className="form-label">{field}</label>
//           <input className="form-control" name={field} onChange={handleChange} required />
//         </div>
//       ))}
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//   );
// };

// export default DynamicForm;

// pages/Dashboard.js
// import React, { useState } from 'react';
// import { useFetchRoles } from '../hooks/useFetchRoles';
// import Dropdown from '../components/Dropdown';
// import DynamicForm from '../components/DynamicForm';
// import Modal from '../components/Modal';

// const Dashboard = () => {
//   const roles = useFetchRoles();
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleRoleChange = (e) => {
//     const role = roles.find((r) => r.role === e.target.value);
//     setSelectedRole(role);
//     setModalOpen(true);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Who are you?</h1>
//       <Dropdown options={roles} onChange={handleRoleChange} />
//       {modalOpen && selectedRole && (
//         <Modal onClose={() => setModalOpen(false)}>
//           <DynamicForm role={selectedRole.role} fields={selectedRole.fields} onClose={() => setModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// components/Modal.js
// import React from 'react';
// import ReactModal from 'react-modal';

// const Modal = ({ children, onClose }) => {
//   return (
//     <ReactModal isOpen onRequestClose={onClose} className="modal-dialog" overlayClassName="modal-overlay">
//       <div className="modal-content p-4">
//         {children}
//         <button className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
//       </div>
//     </ReactModal>
//   );
// };

// export default Modal;

// App.js
// import React from 'react';
// import Dashboard from './pages/Dashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   return (
//     <div className="container">
//       <Dashboard />
//     </div>
//   );
// };

// export default App;

// index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(<App />, document.getElementById('root'));

// // Done! 🚀 Now with Bootstrap styling
