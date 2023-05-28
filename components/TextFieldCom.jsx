import React from "react";
import DropDownCheck from "./DropDownCheck";
import TextFieldWithLimit from "./Description";
import EmailInput from "./MultiEmails";
import MultipleNames from "./MultipleNames";

const TextFieldCom = ({
  title,
  placeholder,
  optionalText,
  description,
  dropDown,
  email,
  tagName,
  type,
  confirmPost,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 my-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl md:text-2xl">{title}</h1>

        <p className=" ml-8 text-slate-400 font-extralight">{optionalText}</p>
      </div>
      <div className="">
        {email ? (
          <>
            <EmailInput placeholder={placeholder} />
          </>
        ) : (
          <>
            <MultipleNames
              placeholder={placeholder}
              title={tagName}
              type={type}
            />
          </>
        )}
      </div>
      {description ? (
        <>
          <TextFieldWithLimit />
        </>
      ) : (
        ""
      )}
      {dropDown ? <DropDownCheck /> : ""}
    </div>
  );
};

export default TextFieldCom;
