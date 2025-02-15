import React, { useState } from "react";
import { getFormsByRole } from "../api/apiService";
import Modal from "react-modal";
import { capitalizeFirstLetter } from "../helpers/helper";
import FadeLoader from "react-spinners/FadeLoader";
const RoleTable = ({ roles }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const handleViewData = async (role) => {
    setSelectedRole(role);
    setLoading(true);
    try {
      const data = await getFormsByRole(role);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching role data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role}>
                <td>{capitalizeFirstLetter(role)}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewData(role)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                <h4>No records found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={!!selectedRole}
        onRequestClose={() => setSelectedRole(null)}
      >
        <div className="position-relative p-4 border rounded bg-light shadow-sm">
          <button
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={() => setSelectedRole(null)}
          ></button>
          <h4 className="mb-3 text-center">
            {capitalizeFirstLetter(selectedRole)} Data
          </h4>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <FadeLoader />
            </div>
          ) : formData.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  {Object.keys(formData[0].data).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData
                  .filter((entry) =>
                    JSON.stringify(entry)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((entry, index) => (
                    <tr key={index}>
                      {Object.values(entry.data).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <h4 className="text-center">No records found</h4>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default RoleTable;
