import React from "react";

const Wrapper = ({ title, optional,}) => {
  
  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl md:text-2xl">{title}</h1>

        <p className=" ml-8 text-slate-400 font-extralight">{optional}</p>
      </div>
    </div>
  );
};

export default Wrapper;
