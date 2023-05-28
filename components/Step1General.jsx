import React, { useEffect, useState } from "react";
import MultiSelect from "./MultiSelect";
import formDataService from './../services/formData'


const General = (props) => {
  const { onHandleDataChange, formData } = props;
  const [ paymentProviderType, setPaymentProviderType ] = useState(
      formData?.payment_provider_type ||
    {
    "Acquirer": false,
    "Processor": false,
    "Gateway": false,
    "Digital Wallet": false
  })
  const [ continents, setContinents ] = useState([])
  useEffect(() => {
    formDataService.countries()
    .then(response => {
      setContinents(response)
    })        
  }, [])  

  
  const handlePaymentProviderType = (key) => {
    const newPaymentProviderType = {...paymentProviderType}
    newPaymentProviderType[key] = !paymentProviderType[key]
    setPaymentProviderType(newPaymentProviderType)
    onHandleDataChange('payment_provider_type', newPaymentProviderType)
  }

  
  return (
    <div className="md:px-0 px-4">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">General</h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please Provide the following general information
        </p>
        <div className="border-b border-slate-900 w-[80%] h-1"></div>
      </div>
      {/* textfields starts here  */}
      {/* website */}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Webiste</h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        <input
          type="text"
          value={formData?.website}
          onChange={(e) => onHandleDataChange('website', e.target.value)}
          placeholder="www.example.com"
          className={`w-[80%] bg-[#374151]
          rounded-md p-6 border-2 border-green-700
          placeholder-white font-extralight
          outline-none h-12`}
        />
      </div>

      {/*  Bussiness name*/}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Bussiness Name</h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        <input
          type="text"
          value={formData?.business_name}
          onChange={(e) => onHandleDataChange('business_name', e.target.value)}
          placeholder="Example Pay"
          className={`w-[80%] bg-[#374151]
          rounded-md p-6 border-2 border-green-700
          placeholder-white font-extralight
          outline-none h-12`}
        />
      </div>

      {/*  description*/}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Description</h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        <textarea
          type="text"
          value={formData?.description}
          onChange={(e) => onHandleDataChange('description', e.target.value)}
          placeholder="Example Pay"
          className={`w-[80%] bg-[#374151]
          rounded-md p-6 border-2 border-green-700
          placeholder-white font-extralight
          outline-none h-28`}
          ></textarea>
      </div>

      {/*  Company Headquaters*/}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Company Headquater
          </h1>
        </div>
        <div>
          <MultiSelect
            selected={formData?.country_of_incorporation}
            onChange={(e) => onHandleDataChange('country_of_incorporation', e)}
            options={continents}
          />
        </div>
      </div>

      {/*  Legal name*/}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Legal Name</h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        <input
          type="text"
          value={formData?.legal_entity_name}
          onChange={(e) => onHandleDataChange('legal_entity_name', e.target.value)}
          placeholder="Legal Name"
          className={`w-[80%] bg-[#374151]
          rounded-md p-6 border-2 border-green-700
          placeholder-white font-extralight
          outline-none h-12`}
        />
      </div>

      {/*  service Provider Type*/}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Service Provider Type
          </h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        {Object.entries(paymentProviderType).map(([key, value], index) => {
          return (
            <>
              <label
                key={index}
                className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start -my-1"
              >
                
                <input
                  type="checkbox"
                  value={key}
                  checked={value}
                  className="w-[20px] h-[20px] mr-6"
                  onChange={() => handlePaymentProviderType(key)}
                />
                <span className="ml-2">{key}</span>
              </label>
            </>
          );
        })}
      </div>

      {/* textfields ends here  */}

    </div>
  );
};

export default General;
