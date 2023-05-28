import React, { useEffect, useState } from "react";

const ContactForm = (props) => {
  const [contact, setContact] = useState(props?.contact || {
    first_name: null,
    last_name: null,
    corporate_email: null,
    job_title: null,
    phone_number: null,
    skype_id: null,
    telegram_id: null
  });

  return (
    <div>
      <div className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none">
        <div className="flex justify-between items-center">
          <div>
            {props.index + 1} {". "}
            <span className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 ">
              {contact?.corporate_email}
            </span>
          </div>
          <div>
            <button
              className="p-1 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 mx-2"
              onClick={props.onRemoveContact}
            >
              Remove{" "}
            </button>
            |
            <button
              className="p-1 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 mx-2"
              onClick={props.onEditContact}
            >
              Edit{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
