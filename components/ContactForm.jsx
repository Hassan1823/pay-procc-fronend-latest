import React, { useEffect, useState } from "react";

const initialState = {
  "first_name": "",
  "last_name": "",
  "corporate_email": "",
  "job_title": "",
  "phone_number": "",
  "skype_id": "",
  "telegram_id": ""
}
const ContactForm = (props) => {
  const [contact, setContact] = useState(
    props.contact || initialState
  )
  const handleInputChange = (event, field) => {
    const newContact = {...contact};
    newContact[field] = event.target.value;
    setContact(newContact)
    return 
  }

  const handleAdd = () => {
      props.onAddContact({...contact});
      setContact({...initialState})  
  }

  // POSTING DATA ENDS HERE
  return (


    <div>
      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Corporate Email:
        </label>
        
        <input
          type="text"
          name="corporate_email"
          value={contact.corporate_email}
          onChange={(e) => handleInputChange(e, 'corporate_email')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>


      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          First name:
        </label>
        
        <input
          type="text"
          name="first_name"
          value={contact.first_name}
          onChange={(e) => handleInputChange(e, 'first_name')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>


      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Last name:
        </label>

        <input
          type="text"
          name="last_name"
          value={contact.last_name}
          onChange={(e) => handleInputChange(e, 'last_name')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>


      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Job Title:
        </label>

        <input
          type="text"
          name="job_title"
          value={contact.job_title}
          onChange={(e) => handleInputChange(e, 'job_title')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>


      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Phone Number:
        </label>

        <input
          type="text"
          name="phone_number"
          value={contact.phone_number}
          onChange={(e) => handleInputChange(e, 'phone_number')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Skype Id:
        </label>

        <input
          type="text"
          name="skype_id"
          value={contact.skype_id}
          onChange={(e) => handleInputChange(e, 'skype_id')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-white font-semibold text-lg"
        >
          Telegram Id:
        </label>

        <input
          type="text"
          name="telegram_id"
          value={contact.telegram_id}
          onChange={(e) => handleInputChange(e, 'telegram_id')}
          className="h-12 p-2 w-70vw border border-[#15803D] rounded-lg text-white bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex justify-center items-center">
      <button 
        className="flex items-center text-white py-2 px-4 rounded-full bg-green-500 hover:bg-green-700 ml-auto my-5"
        onClick={handleAdd}
      > Save Contact </button>
      </div>
    </div>
  );
};

export default ContactForm;
