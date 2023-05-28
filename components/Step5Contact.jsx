import React, { useEffect, useState } from "react";
import ContactForm from './ContactForm';
import ContactFormFold from './ContactFormFold';



const Contact = ({ formData, onHandleDataChange }) => {
  const [contacts, setContacts] = useState(formData?.contacts || [])
  const [active, setActive] = useState(null)
  // POSTING DATA ENDS HERE
  const onChangeContact = (newContact) => {
    
  }

  const onAddContact = (newContact) => {
    if (newContact?.id) {
      const idx = contacts.findIndex(c => c.id == newContact.id)
      const newContacts = [...contacts]
      newContacts[idx] = {...newContact};
      setContacts(newContacts)
      onHandleDataChange(contacts, 'contacts')
    } else {
      console.log(contacts, newContact)
      const newContacts = [...contacts, newContact];
      console.log(newContacts)
      newContact['id'] = (Math.random() + 1).toString(36).substring(7);
      setContacts(newContacts)
      onHandleDataChange('all_contacts', contacts)
    }
    setActive(null);
    
  }
  const onRemoveContact = (index) => {
    console.log(indexedDB)
    const newContacts = [...contacts];
    newContacts.splice(index, 1)
    console.log(newContacts)
    setContacts(newContacts)
    onHandleDataChange(contacts, 'contacts')
  }
  
  const onEditContact = (index) => {
    setActive(contacts[index].id)
  }

  return (
    <div className="flex flex-col space-y-4 w-[80%]">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">Contact</h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please Provide the following contact information
        </p>
        <div className="border-b border-slate-900 w-[55vw] h-1"></div>
      </div>

      { active == null 
        ? <ContactForm 
          contact={null}
          onAddContact={onAddContact} />
        : null
      }
      
      {contacts.map((c, index) => {
        return active == c.id 
        ? <ContactForm 
            key={index}
            contact={c} 
            onAddContact={onAddContact}
            /> 
        : <div>
            <ContactFormFold 
            key={index}
              contact={c} 
              index={index} 

              onRemoveContact={() => onRemoveContact(index)}
              onEditContact={() => onEditContact(index)}
            />
          </div>
      } ) }

      
    </div>
  );
};

export default Contact;
