import { useState, useEffect } from "react";
import { getRoles } from "../api/apiService";

export const useFetchRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return roles;
};
