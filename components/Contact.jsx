import React, { useEffect, useState } from "react";

const Contact = ({ formData, onHandleDataChange }) => {
  const [contacts, setContacts] = useState(formData?.contacts || [])
  // POSTING DATA ENDS HERE
  return (
    <div className="flex flex-col space-y-4 w-[80%]">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">Contact</h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please Provide the following contact information
        </p>
        <div className="border-b border-slate-900 w-[55vw] h-1"></div>
      </div>

      <ContactForm contact={contact} onChange={onChange} />
    </div>
  );
};

export default Contact;
