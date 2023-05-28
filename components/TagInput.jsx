import React, { useState } from "react";

function TagInput() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setInputValue("");
      }
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ backgroundColor: "#020617", color: "white" }}>
      {tags.map((tag, index) => (
        <span key={index} style={{ marginRight: "5px" }}>
          {tag}
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        style={{
          backgroundColor: "#020617",
          color: "white",
          border: "none",
          outline: "none",
          padding: "5px",
        }}
        placeholder="Enter a tag and press Enter"
      />
    </div>
  );
}

export default TagInput;
