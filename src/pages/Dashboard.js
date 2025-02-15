import React, { useState } from "react";
import { useFetchRoles } from "../hooks/useFetchRoles";
import Dropdown from "../components/Dropdown";
import DynamicForm from "../components/DynamicForm";
import Modal from "../components/Modal";
import RoleTable from "../components/RoleTable";

const Dashboard = () => {
  const roles = useFetchRoles();
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoleChange = (e) => {
    const role = roles.find((r) => r.role === e.target.value);
    setSelectedRole(role);
    setModalOpen(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Choose the Role?</h1>
      <Dropdown options={roles} onChange={handleRoleChange} />
      {modalOpen && selectedRole && (
        <Modal onClose={() => setModalOpen(false)}>
          <DynamicForm
            role={selectedRole.role}
            fields={selectedRole.fields}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
      <RoleTable roles={roles.map((role) => role.role)} />{" "}
      {/* Pass only role names */}
    </div>
  );
};

export default Dashboard;
