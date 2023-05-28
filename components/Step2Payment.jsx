import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import formDataService from './../services/formData'

const Payment = (props) => {
  const { onHandleDataChange, formData } = props;
  const [supportedCurrencies, setSupportedCurrencies] = useState([])
  const [supportedIndustries, setSupportedIndustries] = useState([])
  const [supportedSupportedPaymentMethods, setSupportedSupportedPaymentMethods] = useState([])
  
  const [supportedChannels, setSupportedChannels] = useState(formData?.supported_integration_options || {
    "Mail or telephone Order": false, 
    "Hosted Checkout": false,
    "Point of sale": false,
    "Phone-based money transfer service": false,
    "Server-to-server integration": false
  });

  useEffect(() => {
    formDataService.supportedProcessingCurrencies()
    .then(response => {
      console.log('response', response)
      setSupportedCurrencies(response)
    })        

    formDataService.supportedIndustries()
    .then(response => {
      console.log('response', response)
      setSupportedIndustries(response)
    })

    formDataService.supportedPaymentMethods()
    .then(response => {
      console.log('response', response)
      setSupportedSupportedPaymentMethods(response)
    })            

  }, [])
  
  const handlSupportedChannels = (key) => {
    const newSupportedChannels = {...supportedChannels}
    newSupportedChannels[key] = !supportedChannels[key]
    setSupportedChannels(newSupportedChannels)
    onHandleDataChange('supported_integration_options', newSupportedChannels)
  }
  
  const multiData = [
    {
      title: "Supported processing currencies ",
      optional: "optional",
      allData: [
        {
          selected: formData?.supported_processing_currecies,
          options: supportedCurrencies,
          functionProp: (e) => onHandleDataChange('supported_processing_currecies', e),
        }
      ],
    },
    {
      title: "Supported industries",
      optional: "optional",
      allData: [
        {
           selected: formData?.supported_industries,
           options: supportedIndustries,
           functionProp: (e) => onHandleDataChange('supported_industries', e),
        }
      ]
    },
    {
      title: "Suported payment methods",
      optional: "optional",
      allData: [
        {
           selected: formData?.supported_payment_methods,
           options: supportedSupportedPaymentMethods,
           functionProp: (e) => onHandleDataChange('supported_payment_methods', e),
        }
      ],
    },
  ];
  
  
  return (
    <div className="md:px-0 px-4 my-4">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">
          Feature & Capabilities
        </h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please Provide details on currencies and payment methods your
          organisation operates with
        </p>
        <div className="border-b border-slate-900 w-[80%] h-1"></div>
      </div>

      {multiData.map((multiData, index) => {
        return (
          <div key={index}>
            <div className="flex items-center my-4">
              <h1 className="font-semibold text-xl md:text-2xl">
                {multiData.title}
              </h1>

              <p className=" ml-8 text-slate-400 font-extralight">
                {multiData.optional}
              </p>
            </div>
            {multiData.allData.map((data, index) => {
              return (
                <MultiSelect
                  selected={data?.selected}
                  onChange={data.functionProp}
                  options={data.options}
                  key={index}
                />
              );
            })}
          </div>
        );
      })}

      {/* for drop down */}
    
        <div className="flex items-center my-4">
          <h1 className="font-semibold text-xl md:text-2xl">
            Supported channel & integration option
          </h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        {Object.entries(supportedChannels).map(([key, value], index) => {
          return (
            <>
              <label
                key={index}
                className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start my-1"
              >
                
                <input
                  type="checkbox"
                  value={key}
                  checked={value}
                  className="w-[20px] h-[20px] mr-6"
                  onChange={() => handlSupportedChannels(key)}
                />
                <span className="ml-2">{key}</span>
              </label>
            </>
          );
        })}
    
    </div>
  );
};

export default Payment;
