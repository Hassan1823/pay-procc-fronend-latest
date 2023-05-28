import React, { useState, useEffect } from "react";

const TextFieldWithLimit = ({ confirmPost }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 500;

  useEffect(() => {
    const storedText = localStorage.getItem("text");
    if (storedText) {
      setText(storedText);
      setWordCount(
        storedText.trim().split(/\s+/).filter(Boolean).length
      );
    }
  }, []);

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    const inputWords = inputText
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (inputWords.length <= maxWords) {
      setText(inputText);
      setWordCount(inputWords.length);
      localStorage.setItem("text", inputText);
    }
  };

 

  return (
    <div className="grid grid-cols-1 gap-4 my-2">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl md:text-2xl">Description</h1>

        <p className=" ml-8 text-slate-400 font-extralight">optional</p>
      </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-[80%] bg-slate-950
      h-auto rounded-md p-6 border-2 border-green-700
      placeholder-white font-extralight
      outline-none"
      />
      <p>
        {wordCount}/{maxWords} words
      </p>
    </div>
  );
};

export default TextFieldWithLimit;
