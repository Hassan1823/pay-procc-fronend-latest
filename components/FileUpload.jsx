import React from "react";

const FileUpload = (props) => {
  const { name, handleFileChange, selected, docType } = props;
  let id = (Math.random() + 1).toString(36).substring(7);

  return (
    <div>
      <div className="w-[80%] h-12 bg-[#374151] text-white border border-[#15803D] rounded-md px-2 py-6 flex justify-items-center items-center">
        {selected && (
          <div className="m-1 bg-[#333333] text-yellow-500 rounded-lg p-2 flex items-center">
            <span>{selected.name}</span>
            <button
              onClick={(e) => handleFileChange(e)}
              className="text-red-500 rounded-lg ml-2"
            >
              x
            </button>
          </div>
        )}
        <label
          htmlFor={id + name}
          className="bg-[#333333] text-yellow-500 rounded-lg px-2 py-1 cursor-pointer ml-auto"
        >
          Upload
        </label>
        
        <input
          id={id + name}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-yellow-500 mt-1">Format : {docType}</p>
    </div>
  );
};

export default FileUpload;
