import React, { useState } from "react";
import Select, { components } from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#020617",
    border: "2px solid #15803D",
    borderRadius: "10px",
    outlineColor: "#45CF79",
    height: "10vh",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#020617",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "white",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#3FA8E3",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const MultiValueLabel = (props) => {
  const parentLabel = props.data.parentLabel;
  const count = props.selectProps.value.filter(
    (option) => option.parentLabel === parentLabel
  ).length;
  return (
    <components.MultiValueLabel {...props}>
      {parentLabel} ({count})
    </components.MultiValueLabel>
  );
};

const MultiSelectMenu = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const formatOptionLabel = ({ value, label, parentLabel }) => (
    <div>{parentLabel ? `${parentLabel}: ${label}` : label}</div>
  );

  return (
    <Select
      options={options}
      styles={customStyles}
      className="text-white w-[80%] h-[5vh]"
      classNamePrefix="react-select"
      isMulti
      onChange={handleChange}
      value={selectedOptions}
      formatOptionLabel={formatOptionLabel}
      components={{ MultiValueLabel }}
      placeholder="Select an option"
    />
  );
};

export default MultiSelectMenu;
