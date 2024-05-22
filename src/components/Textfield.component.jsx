import React, { useState } from "react";
import { TextField } from "@mui/material";
const TextFieldComponent = ({ onChange, ...props }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <TextField value={value} onChange={handleChange} {...props} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TextFieldComponent;
