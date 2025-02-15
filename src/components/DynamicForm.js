import React, { useState } from "react";
import { saveFormData } from "../api/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeFirstLetter, formatFieldLabel } from "../helpers/helper";

const DynamicForm = ({ role, fields, onClose }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const lowercaseName = name.toLowerCase();

    if (!value || value.trim() === "") {
      return `${formatFieldLabel(name)} is required`;
    }

    if (lowercaseName.includes("email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (lowercaseName.includes("contact") || lowercaseName.includes("phone")) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number";
      }
    }

    if (lowercaseName.includes("age")) {
      const age = parseInt(value);
      if (isNaN(age) || age < 0 || age > 120) {
        return "Please enter a valid age";
      }
    }

    if (lowercaseName.includes("grade")) {
      const grade = parseInt(value);
      if (isNaN(grade) || grade < 1 || grade > 12) {
        return "Please enter a valid grade (1-12)";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const formattedField = formatFieldLabel(field);
      const error = validateField(field, formData[formattedField] || "");
      if (error) {
        newErrors[formattedField] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await saveFormData({ role, data: formData });
      toast.success("Form submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center w-100 h-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="p-4 border rounded bg-white shadow-lg mx-3"
        style={{
          width: "400px",
          maxWidth: "95%",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "2px solid #dee2e6",
        }}
      >
        <div className="position-relative mb-4">
          <button
            className="btn-close position-absolute top-0 end-0"
            onClick={onClose}
          ></button>
          <h4 className="text-center mb-0 pe-4">
            {capitalizeFirstLetter(role)} Form
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {fields.map((field) => {
            const formattedField = formatFieldLabel(field);
            return (
              <div className="mb-4" key={field}>
                <label className="form-label fw-semibold">
                  {formattedField}
                  <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control ${
                    errors[formattedField] ? "is-invalid" : ""
                  }`}
                  name={formattedField}
                  onChange={handleChange}
                  required
                  placeholder={`Enter ${formattedField}`}
                  type={
                    field.toLowerCase().includes("email") ? "email" : "text"
                  }
                />
                {errors[formattedField] && (
                  <div className="invalid-feedback">
                    {errors[formattedField]}
                  </div>
                )}
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
