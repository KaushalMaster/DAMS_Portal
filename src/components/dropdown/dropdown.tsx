import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Simulated API data
const fakeApiData = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

export const Dropdown = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  // Simulate fetching data from an API
  useEffect(() => {
    setData(fakeApiData);
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Options</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        label="Options"
        onChange={handleChange}
      >
        {data.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
