import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import formDataService from './../services/formData'


const Merchant = (props) => {
  const { onHandleDataChange, formData } = props;
  const [ currencies, setCurrencies ] = useState([]);
  const [ continents, setContinents ] = useState([]);
  useEffect(() => {
    formDataService.supportedProcessingCurrencies()
    .then(response => {
      console.log('response', response)
      setCurrencies(response)
    })        
    
    formDataService.countries()
    .then(response => {
      setContinents(response)
    })        

  }, [])

  const [merchantDelay, setMerchantDelay] = useState(formData?.marchent_settlement_days || {
    "1 - 3 days": false,
    "4 - 7 days": false, 
    "7 - 14 days": false,
  });
  const [merchantFrequency, setMerchantFrequency] = useState(formData?.marchent_settlement_frequency || {
    "Within a few months": false,
    "On demand": false,
    "everyday": false,
    "Within a few days": false,
    "Within a few weeks": false,
  });

  const handlMerchantDelay = (key) => {
    const newMerchantDelay = {...merchantDelay}
    newMerchantDelay[key] = !merchantDelay[key]
    setMerchantDelay(newMerchantDelay)
    onHandleDataChange('marchent_settlement_days', newMerchantDelay)
  }

  const handlMerchantFrequency = (key) => {
    const newmerchantFrequency = {...merchantFrequency}
    console.log(merchantFrequency, key)
    newmerchantFrequency[key] = !merchantFrequency[key]
    setMerchantFrequency(newmerchantFrequency)
    onHandleDataChange('marchent_settlement_frequency', newmerchantFrequency)
  }


  const multiData = [
    {
      title: "Supported countries of incorporation ",
      optional: "optional",
      allData: [
        {
          selected: formData?.supported_countries_of_incorporation_merchant,
          options: continents,
          functionProp: (e) => onHandleDataChange('supported_countries_of_incorporation_merchant', e),
        },
      ],
    },
    {
      title: "Supported settlement currencies",
      optional: "optional",
      allData: [
        {
          selected: formData?.supported_settlement_currecies,
          options: currencies,
          functionProp: (e) => onHandleDataChange('supported_settlement_currecies', e),
        },
      ],
    },
  ];

  return (
    <div className="md:px-0 px-4 my-4">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">
          Merchant terms
        </h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please specify merchant service terms
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
                  key={index}
                  selected={data.selected}
                  onChange={data.functionProp}
                  options={data.options}
                />
              );
            })}
          </div>
        );
      })}
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Merchant settlement delay
          </h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        {Object.entries(merchantDelay).map(([key, value], index) => {
          return (
            <>
              <label
                key={index}
                className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start -my-1"
              >
              <input
                  type="checkbox"
                  value={key}
                  className="w-[20px] h-[20px] mr-6"
                  checked={value}
                  onChange={() => handlMerchantDelay(key)}
                />
                <span className="ml-2">{key}</span>
              </label>
            </>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Merchant settlement delay
          </h1>

          <p className=" ml-8 text-slate-400 font-extralight">optional</p>
        </div>
        {Object.entries(merchantFrequency).map(([key, value], index) => {
          return (
            <>
              <label
                key={index}
                className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start -my-1"
              >
                <input
                  type="checkbox"
                  value={key}
                  className="w-[20px] h-[20px] mr-6"
                  checked={value}
                  onChange={() => handlMerchantFrequency(key)}
                />
                <span className="ml-2">{key}</span>
              </label>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Merchant;
