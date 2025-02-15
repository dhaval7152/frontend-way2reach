import React from "react";
import { capitalizeFirstLetter } from "../helpers/helper";

const Dropdown = ({ options, onChange }) => {
  return (
    <select className="form-select" onChange={onChange}>
      <option value="">Select a role</option>
      {options.map((option) => (
        <option key={option.role} value={option.role}>
          {capitalizeFirstLetter(option.role)}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
