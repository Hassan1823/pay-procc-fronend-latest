import React, { useEffect, useState } from "react";
import WrapperCon from "./Wrapper";
import MultiSelect from "./MultiSelect";
import axios from "axios";

const generalData = [
  {
    title: "Website",
    name: "website",
    optional: "optional",
    type: "text",
    placeholder: "www.example.com",
    limit: 999,
    height: "h-12",
  },
  {
    title: "Business Name",
    name: "businessName",
    optional: "",
    type: "text",
    placeholder: "Exampe pay",
    limit: 999,
    height: "h-12",
  },
  {
    title: "Description",
    name: "description",
    optional: "optional",
    type: "text",
    placeholder: "Description ...",
    limit: 50,
    height: "h-28",
  },
  {
    title: "Company Headquater",
    name: "companyHeadquater",
    optional: "optional",
    type: "multiple",
    placeholder: "",
    limit: 999,
    height: "h-28",
  },
  {
    title: "Legal Name",
    name: "legalName",
    optional: "optional",
    type: "text",
    placeholder: "Legal Name",
    limit: 999,
    height: "h-12",
  },
  {
    title: "Service Provider Type",
    name: "serviceProvider",
    optional: "optional",
    type: "checkBox",
    placeholder: "",
    limit: 999,
    height: "h-12",
  },
];

const continents = [
  {
    name: "Africa",
    label: [
      "Algeria",
      "Angola",
      "Benin",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cameroon",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Comoros",
      "Congo",
      "Congo, Democratic Republic of the Congo",
      "Cote D'Ivoire",
      "Djibouti",
      "Egypt",
      "Equatorial Guinea",
      "Eritrea",
      "Ethiopia",
      "Gabon",
      "Gambia",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Kenya",
      "Lesotho",
      "Liberia",
      "Libyan Arab Jamahiriya",
      "Madagascar",
      "Malawi",
      "Mali",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Niger",
      "Nigeria",
      "Reunion",
      "Rwanda",
      "Saint Helena",
      "Sao Tome and Principe",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Sudan",
      "Swaziland",
      "Tanzania, United Republic of",
      "Togo",
      "Tunisia",
      "Uganda",
      "Western Sahara",
      "Zambia",
      "Zimbabwe",
    ],
    total: 58,
  },
  {
    name: "Australia",
    label: [
      "American Samoa",
      "Australia",
      "Cook Islands",
      "Fiji",
      "French Polynesia",
      "Guam",
      "Kiribati",
      "Marshall Islands",
      "Micronesia, Federated States of",
      "Nauru",
      "New Caledonia",
      "New Zealand",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Palau",
      "Papua New Guinea",
      "Pitcairn",
      "Samoa",
      "Solomon Islands",
      "Tokelau",
      "Tonga",
      "Tuvalu",
      "Vanuatu",
      "Wallis and Futuna",
    ],
    total: 25,
  },
  {
    name: "Asia",
    label: [
      "Afghanistan",
      "Armenia",
      "Azerbaijan",
      "Bahrain",
      "Bangladesh",
      "Bhutan",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Cambodia",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Cyprus",
      "Georgia",
      "Hong Kong",
      "India",
      "Indonesia",
      "Iran, Islamic Republic of",
      "Iraq",
      "Israel",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Korea, Democratic People's Republic of",
      "Korea, Republic of",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic",
      "Lebanon",
      "Macao",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "Oman",
      "Pakistan",
      "Palestinian Territory, Occupied",
      "Philippines",
      "Qatar",
      "Russian Federation",
      "Saudi Arabia",
      "Singapore",
      "Sri Lanka",
      "Syrian Arab Republic",
      "Taiwan, Province of China",
      "Tajikistan",
      "Thailand",
      "Timor-Leste",
      "Turkey",
      "Turkmenistan",
      "United Arab Emirates",
      "Uzbekistan",
      "Viet Nam",
      "Yemen",
    ],
    total: 55,
  },
  {
    name: "North America",
    label: [
      "Anguilla",
      "Antigua and Barbuda",
      "Aruba",
      "Bahamas",
      "Barbados",
      "Belize",
      "Bermuda",
      "Bonaire, Sint Eustatius and Saba",
      "Canada",
      "Cayman Islands",
      "Costa Rica",
      "Cuba",
      "Curacao",
      "Dominica",
      "Dominican Republic",
      "El Salvador",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guatemala",
      "Haiti",
      "Honduras",
      "Jamaica",
      "Martinique",
      "Mexico",
      "Montserrat",
      "Netherlands Antilles",
      "Nicaragua",
      "Panama",
      "Puerto Rico",
      "Saint Barthelemy",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "St Martin",
      "Trinidad and Tobago",
      "Turks and Caicos Islands",
      "United States",
      "United States Minor Outlying Islands",
      "Virgin Islands, British",
      "Virgin Islands, U.s.",
    ],
    total: 43,
  },
  {
    name: "South America",
    label: [
      "Argentina",
      "Bolivia",
      "Brazil",
      "Chile",
      "Colombia",
      "Ecuador",
      "Falkland Islands (Malvinas)",
      "French Guiana",
      "Guyana",
      "Paraguay",
      "Peru",
      "Suriname",
      "Uruguay",
      "Venezuela",
    ],
    total: 14,
  },
  {
    name: "Europe",
    label: [
      "Aland Islands",
      "Albania",
      "Andorra",
      "Austria",
      "Belarus",
      "Belgium",
      "Bosnia and Herzegovina",
      "Bulgaria",
      "Croatia",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Faroe Islands",
      "Finland",
      "France",
      "Germany",
      "Gibraltar",
      "Greece",
      "Guernsey",
      "Holy See (Vatican City State)",
      "Hungary",
      "Iceland",
      "Ireland",
      "Isle of Man",
      "Italy",
      "Jersey",
      "Kosovo",
      "Latvia",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macedonia, the Former Yugoslav Republic of",
      "Malta",
      "Moldova, Republic of",
      "Monaco",
      "Montenegro",
      "Netherlands",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "San Marino",
      "Serbia",
      "Serbia and Montenegro",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Ukraine",
      "United Kingdom",
    ],
    total: 52,
  },
];

const dataCheckBox = ["Acquirer", "Processor", "Gateway", "Digital Wallet"];

const General = () => {
  const [merchantCountries, setMerchantCountries] = useState({});
  const [serviceProvider, setServiceProvider] = useState([]);
  // const [textFieldsData, setTextFieldsData] = useState({});
  const [inputWebsite, setInputWebsite] = useState("");
  const [inputBussiness, setInputBussiness] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputLegalName, setInputLegalName] = useState("");

  // localstorage STARTs here
  const handleInputWebiste = (event) => {
    const value = event.target.value;
    setInputWebsite(value);
    localStorage.setItem("inputWebsite", value);
  };
  const handleInputBussiness = (event) => {
    const value = event.target.value;
    setInputBussiness(value);
    localStorage.setItem("inputBussiness", value);
  };
  const handleInputDescription = (event) => {
    const value = event.target.value;
    setInputDescription(value);
    localStorage.setItem("inputDescription", value);
  };
  const handleInputLegalName = (event) => {
    const value = event.target.value;
    setInputLegalName(value);
    localStorage.setItem("inputLegalName", value);
  };
  useEffect(() => {
    const webiste = localStorage.getItem("inputWebsite");
    const bussiness = localStorage.getItem("inputBussiness");
    const description = localStorage.getItem("inputDescription");
    const legalName = localStorage.getItem("inputLegalName");
    if (webiste) {
      setInputWebsite(webiste);
    }
    if (bussiness) {
      setInputBussiness(bussiness);
    }
    if (description) {
      setInputDescription(description);
    }
    if (description) {
      setInputDescription(description);
    }
    if (legalName) {
      setInputLegalName(legalName);
    }
  }, []);

  // const postData = async () => {
  //   let authKey = JSON.parse(localStorage.getItem("login"));
  //   if (!authKey || !authKey.access_token) {
  //     // Redirect to the '/' page
  //     router.push("/");
  //     return;
  //   }
  //   let token = "Bearer " + authKey.access_token;
  //   try {
  //     const response = await axios({
  //       url: "<API_URL>",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: token,
  //       },
  //       data: {
  //         registeredUsers: registeredUsers
  //       },
  //       method: "post",
  //     });
  //     console.log("Response: ", response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // checkbox  klocalstorage
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setServiceProvider((prev) => {
        if (!prev.includes(value)) {
          return [...prev, value];
        }
        return prev;
      });
      localStorage.setItem(value, checked);
    } else {
      setServiceProvider((prev) => prev.filter((item) => item !== value));
      localStorage.removeItem(value);
    }
  };

  useEffect(() => {
    dataCheckBox.forEach((checkData) => {
      if (localStorage.getItem(checkData)) {
        setServiceProvider((prev) => [...prev, checkData]);
      }
    });
  }, []);

  // const handleCheckboxChange = (event) => {
  //   if (event.target.checked) {
  //     setServiceProvider([...serviceProvider, event.target.value]);
  //   } else {
  //     setServiceProvider(
  //       serviceProvider.filter((item) => item !== event.target.value)
  //     );
  //   }
  // };
  function handleChildStateChange(childState) {
    setMerchantCountries(childState);
  }

  localStorage.setItem("serviceProvider", serviceProvider);
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
          value={inputWebsite}
          onChange={handleInputWebiste}
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
          value={inputBussiness}
          onChange={handleInputBussiness}
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
        <input
          type="text"
          value={inputDescription}
          onChange={handleInputDescription}
          placeholder="Example Pay"
          className={`w-[80%] bg-[#374151]
          rounded-md p-6 border-2 border-green-700
          placeholder-white font-extralight
          outline-none h-28`}
        />
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
            onChildStateChange={handleChildStateChange}
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
          value={inputLegalName}
          onChange={handleInputLegalName}
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
        {dataCheckBox.map((checkData, index) => {
          return (
            <>
              <label
                key={index}
                className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start -my-1"
              >
                <input
                  type="checkbox"
                  value={checkData}
                  className="w-[20px] h-[20px] mr-6"
                  onChange={handleCheckboxChange}
                  checked={
                    serviceProvider && serviceProvider.includes(checkData)
                  }
                />
                <span className="ml-2">{checkData}</span>
              </label>
            </>
          );
        })}
      </div>

      {/* textfields ends here  */}

      {/* {generalData.map((generalData, index) => {
        return (
          <>
            <div key={index}>
              <WrapperCon
                title={generalData.title}
                optional={generalData.optional}
              />
              {generalData.type === "text" ? (
                <>
                  <div className="my-4">
                    <input
                      type={generalData.type}
                      value={textFieldsData[generalData.name] || ""}
                      onChange={(e) => {
                        const fieldValue = e.target.value;
                        if (fieldValue.split(" ").length <= generalData.limit) {
                          setTextFieldsData({
                            ...textFieldsData,
                            [generalData.name]: fieldValue,
                          });
                        }
                      }}
                      placeholder={generalData.placeholder}
                      className={`w-[80%] bg-[#374151]
         rounded-md p-6 border-2 border-green-700
         placeholder-white font-extralight
         outline-none ${generalData.height}`}
                    />
                    {generalData.limit === 50 ? (
                      <>
                        <div>{`${
                          generalData.limit -
                          (textFieldsData[generalData.name]
                            ? textFieldsData[generalData.name].split(" ").length
                            : 0)
                        } words remaining`}</div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : generalData.type === "multiple" ? (
                <>
                  <div>
                    <MultiSelect
                      onChildStateChange={handleChildStateChange}
                      continents={continents}
                    />
                  </div>
                </>
              ) : generalData.type === "checkBox" ? (
                <>
                  {dataCheckBox.map((checkData, index) => {
                    return (
                      <>
                        <label
                          key={index}
                          className="w-[80%] bg-[#374151] h-12 rounded-md p-4 border-2 border-slate-700 flex items-start my-1"
                        >
                          <input
                            type="checkbox"
                            value={checkData}
                            className="w-[20px] h-[20px] mr-6"
                            onChange={handleCheckboxChange}
                          />
                          <span className="ml-2">{checkData}</span>
                        </label>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </>
        );
      })} */}
    </div>
  );
};

export default General;
