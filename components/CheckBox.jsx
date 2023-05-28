import React from "react";

const CheckBox = ({ dataCheckBox, title }) => {
  return (
    <div className="my-24">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl md:text-2xl">{title}</h1>

        <p className=" ml-8 text-slate-400 font-extralight">Optional</p>
      </div>
      {dataCheckBox.map((dataCheck, index) => {
        return (
          <div
            key={index}
            className="w-[80%] bg-slate-950
          h-12 rounded-md p-4 border-2 border-slate-700
          flex items-start my-2"
          >
            <input
              type="checkbox"
              id={index + 1}
              name={dataCheck}
              value={dataCheck}
              className="w-[20px] h-[20px] mr-6"
            />
            <label for="vehicle1" className="md:font-thin">
              {" "}
              {dataCheck}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBox;
