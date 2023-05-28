import React, { useState, useEffect } from "react";

const ProofCompliance = ({ docType, inputId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fileName = localStorage.getItem(`ProofName${inputId}`);
    const fileData = localStorage.getItem(`ProofData${inputId}`);
    if (fileName && fileData) {
      setFile({ name: fileName });
    }
  }, [inputId]);

  const handleFileChange = (event) => {
    console.log("handleFileChange called");
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }
    setFile(event.target.files[0]);
    saveFile(event.target.files[0]);
  };

  const saveFile = (file) => {
    console.log("saveFile called");
    try {
      localStorage.setItem(`ProofName${inputId}`, file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log("reader.onload called");
        localStorage.setItem(`ProofData${inputId}`, e.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        setError(
          "Failed to save file: local storage quota exceeded. Please try uploading a smaller file."
        );
      } else {
        setError(`Failed to save file: ${e.message}`);
      }
    }
  };

  const removeFile = () => {
    console.log("removeFile called");
    setFile(null);
    localStorage.removeItem(`ProofName${inputId}`);
    localStorage.removeItem(`ProofData${inputId}`);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-[80%] h-12 bg-[#374151] text-white border border-[#15803D] rounded-md px-2 py-6 flex justify-items-center items-center">
        {file && (
          <div className="m-1 bg-[#333333] text-yellow-500 rounded-lg p-2 flex items-center">
            <span>{file.name}</span>
            <button
              onClick={removeFile}
              className="text-red-500 rounded-lg ml-2"
            >
              x
            </button>
          </div>
        )}
        <label
          htmlFor={inputId}
          className="bg-[#333333] text-yellow-500 rounded-lg px-2 py-1 cursor-pointer ml-auto"
        >
          Upload
        </label>
        <input
          id={inputId}
          type="file"
          className="hidden"
          accept={docType}
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-yellow-500 mt-1">Format : {docType}</p>
    </div>
  );
};

export default ProofCompliance;
