import React, { useState, useEffect } from "react";
import Fuse from 'fuse.js';

const MultiSelect = ({ onChange, selected, options }) => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedCountries = selected || []; // from props

  const handleSelect = (continent) => {
    setSearchTerm('')
    if (selectedContinent === continent) {
      setSelectedContinent(null);
    } else {
      setSelectedContinent(continent);
    }
  };

  const handleCountrySelect = (country) => {
    if (selectedCountries.includes(country.Id)) {
      const newSelectedCountries = [...selectedCountries]
      const index = newSelectedCountries.findIndex(
        c => country.Id == c
      )
      newSelectedCountries.splice(index, 1)
      onChange(newSelectedCountries)
    } else {
      onChange(
        [...selectedCountries, country.Id]
      )
    }
  };
  const countSelectedPerContinent = (continent) =>  {
    const _continent = options[continent] ?? null;
    if (_continent) {
      return _continent.filter(
        c => selectedCountries.includes(c.Id)
      ).length
    }
    return 0;
  }

  const countriesList = () => {
    if (searchTerm == '') return options[selectedContinent];
    return new Fuse(options[selectedContinent], {keys: ['Name']}).search(searchTerm).map(x => x.item)
  }

  const allSelection = () => {
    const countryIds = options[selectedContinent].map(x => x.Id)

    const selectedAll = countryIds.every(x => selectedCountries.includes(x))
    if (selectedAll) {
      let newSelectedCountries = [...selectedCountries];
      newSelectedCountries = newSelectedCountries.filter(x => !countryIds.includes(x))
      onChange(newSelectedCountries)
    } else {
      onChange([
        ...new Set(
        selectedCountries.concat(countryIds)
        )
      ])
    }
  }

  if (options == null) {
    return null;
  }

  return (
    <div className="bg-[#374151] text-white rounded-md" style={{ width: "80%" }}>
      <div className="flex p-3 border border-[#15803D] rounded-lg" style={{ flexWrap: "wrap" }}>
        {Object.entries(options).map(([continent, countries]) => (
          <button
            key={continent}
            onClick={() => handleSelect(continent)}
            className={`cursor-pointer bg-[#1E2125] text-white p-2 rounded-lg flex justify-center items-center
              ${selectedContinent === continent ? 'bg-gray-700' : ''}
            `}
            style={{
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              width: "12vw",
            }}
          >
              {continent} <br />
              <div className="text-blue-500 ml-1">
                ({countSelectedPerContinent(continent)} / {countries.length})
              </div>
          </button>
        ))}
      </div>
      {selectedContinent && (
  <div>
  <input 
    type="text" 
    placeholder="Search Country"
    className={`m-2 w-[80%] bg-[#374151]
    rounded-md p-6 border-2 border-green-700
    placeholder-white font-extralight
    outline-none h-12`}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    /> 
    
  <button onClick={allSelection} >
  {countSelectedPerContinent(selectedContinent) == options[selectedContinent].length 
    ? 'Deletect All' : 'Select All'
  }
  </button>
  <button className="ml-8 " style={{color: '#eeee'}}
    onClick={() => handleSelect(selectedContinent)}
  >X</button>
  <ul className="list-none m-0 p-3 rounded-lg">
    {/* <button
      className="cursor-pointer bg-[#1E2125] w-[10vw] text-white p-2 rounded-lg mt-3"
      onClick={() =>
        setSelectedlabel((prevSelectedlabel) => {
          if (
            prevSelectedlabel[selectedContinent] &&
            prevSelectedlabel[selectedContinent].length === selectedContinent.label.length
          ) {
            return {
              ...prevSelectedlabel,
              [selectedContinent.name]: [],
            };
          } else {
            return {
              ...prevSelectedlabel,
              [selectedContinent.name]: selectedContinent.label,
            };
          }
        })
      }
    >
      {selectedlabel[selectedContinent.name] &&
      selectedlabel[selectedContinent.name].length === selectedContinent.label.length
        ? "Deselect All"
        : "Select All"}
    </button> */}
    
    {selectedContinent && countriesList().map(item => (
      <li
        key={item.Name}
        onClick={() => handleCountrySelect(item)}
        className={`${
          selectedCountries.includes(item.Id)
            ? "text-yellow-500"
            : "text-white"
        } hover:bg-white hover:text-gray-900 cursor-pointer p-1 my-1 rounded`}
      >
        {item.Name}
      </li>
    ))}
  </ul>
  </div>
)}
    </div>
  );
};

export default MultiSelect;
