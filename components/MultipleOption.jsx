import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "apple", label: "Apple", disabled: false },
  { value: "banana", label: "Banana", disabled: false },
  { value: "orange", label: "Orange", disabled: false },
  { value: "pear", label: "Pear", disabled: false },
];

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    // Check if selectAllOption is already selected
    if (selected.some((option) => option.value === "all")) {
      // Prevent user from selecting other options
      setSelectedOptions([selectAllOption]);
    } else {
      setSelectedOptions(selected);
    }
  };

  const handleSelectAll = () => {
    // Check if all options are already selected
    if (selectedOptions.length === options.length) {
      // Prevent user from selecting selectAllOption
      setSelectedOptions(options);
    } else {
      setSelectedOptions([selectAllOption]);
    }
  };

  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex", alignItems: "center", minHeight: "4vh" }}>
      <div style={{ marginRight: 8, color: "white" }}>{label}</div>
      <div style={{ fontSize: 12, color: "white" }}>fruit</div>
    </div>
  );

  const selectAllOption = {
    value: "all",
    label: "Select all",
    onClick: handleSelectAll,
    // Disable selectAllOption if all options are already selected
    disabled: selectedOptions.length === options.length,
  };

  const styles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#020617",
      border: "none",
      minHeight: "8vh",
      borderRadius: "10px",
      padding: "1.5%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#444" : "transparent",
      color: state.isSelected ? "#fff" : "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#020617",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#020617",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#444",
      borderRadius: "10px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": {
        backgroundColor: "#444",
        color: "white",
        borderRadius: "10px",
      },
    }),
  };

  return (
    <div className="w-[80%]">
      <Select
        isMulti
        options={[selectAllOption, ...options]}
        value={selectedOptions}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        placeholder="Select fruits"
        menuPlacement="auto"
        closeMenuOnSelect={false}
        styles={styles}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default MultiSelect;
