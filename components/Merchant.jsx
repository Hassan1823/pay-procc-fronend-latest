import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import axios from "axios";

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

const currencies = [
  {
    name: "National",
    label: [
      "Afghan Afghani (AFN)",
      "Albanian Lek (ALL)",
      "Algerian Dinar (DZD)",
      "Andorran Peseta (ADP)",
      "Angolan Kwanza (AOA)",
      "Argentine Austral (ARA)",
      "Argentine Peso (ARS)",
      "Armenian Dram (AMD)",
      "Aruban Florin (AWG)",
      "Australian Dollar (AUD)",
      "Austrian Schilling (ATS)",
      "Azerbaijani Manat (AZN)",
      "Bahamian Dollar (BSD)",
      "Bahraini Dinar (BHD)",
      "Bangladeshi Taka (BDT)",
      "Barbadian Dollar (BBD)",
      "Belarusian Ruble (BYN)",
      "Belgian Franc (BEF)",
      "Belgian Franc (convertible) (BEC)",
      "Belgian Franc (financial) (BEL)",
      "Belize Dollar (BZD)",
      "Bermudan Dollar (BMD)",
      "Bhutanese Ngultrum (BTN)",
      "Bolivian Boliviano (BOB)",
      "Bolivian Mvdol (BOV)",
      "Bolivian Peso (BOP)",
      "Bosnia-Herzegovina Convertible Mark (BAM)",
      "Botswanan Pula (BWP)",
      "Brazilian Real (BRL)",
      "British Pound (GBP)",
      "Brunei Dollar (BND)",
      "Bulgarian Hard Lev (BGL)",
      "Bulgarian Lev (BGN)",
      "Bulgarian Socialist Lev (BGM)",
      "Burmese Kyat (BUK)",
      "Burundian Franc (BIF)",
      "CFP Franc (XPF)",
      "Cambodian Riel (KHR)",
      "Canadian Dollar (CAD)",
      "Cape Verdean Escudo (CVE)",
      "Cayman Islands Dollar (KYD)",
      "Central African CFA Franc (XAF)",
      "Chilean Escudo (CLE)",
      "Chilean Peso (CLP)",
      "Chilean Unit of Account (UF) (CLF)",
      "Chinese People’s Bank Dollar (CNX)",
      "Chinese Yuan (CNY)",
      "Colombian Peso (COP)",
      "Colombian Real Value Unit (COU)",
      "Comorian Franc (KMF)",
      "Congolese Franc (CDF)",
      "Costa Rican Colón (CRC)",
      "Croatian Dinar (HRD)",
      "Croatian Kuna (HRK)",
      "Cuban Convertible Peso (CUC)",
      "Cuban Peso (CUP)",
      "Cypriot Pound (CYP)",
      "Czech Koruna (CZK)",
      "Czechoslovak Hard Koruna (CSK)",
      "Danish Krone (DKK)",
      "Djiboutian Franc (DJF)",
      "Dominican Peso (DOP)",
      "Dutch Guilder (NLG)",
      "East Caribbean Dollar (XCD)",
      "East German Mark (DDM)",
      "Ecuadorian Sucre (ECS)",
      "Ecuadorian Unit of Constant Value (ECV)",
      "Egyptian Pound (EGP)",
      "Equatorial Guinean Ekwele (GQE)",
      "Eritrean Nakfa (ERN)",
      "Estonian Kroon (EEK)",
      "Ethiopian Birr (ETB)",
      "Euro (EUR)",
      "European Currency Unit (XEU)",
      "Falkland Islands Pound (FKP)",
      "Fijian Dollar (FJD)",
      "Finnish Markka (FIM)",
      "French Franc (FRF)",
      "French Gold Franc (XFO)",
      "French UIC-Franc (XFU)",
      "Gambian Dalasi (GMD)",
      "Georgian Kupon Larit (GEK)",
      "Georgian Lari (GEL)",
      "German Mark (DEM)",
      "Ghanaian Cedi (GHS)",
      "Gibraltar Pound (GIP)",
      "Greek Drachma (GRD)",
      "Guatemalan Quetzal (GTQ)",
      "Guinea-Bissau Peso (GWP)",
      "Guinean Franc (GNF)",
      "Guinean Syli (GNS)",
      "Guyanaese Dollar (GYD)",
      "Haitian Gourde (HTG)",
      "Honduran Lempira (HNL)",
      "Hong Kong Dollar (HKD)",
      "Hungarian Forint (HUF)",
      "Icelandic Króna (ISK)",
      "Indian Rupee (INR)",
      "Indonesian Rupiah (IDR)",
      "Iranian Rial (IRR)",
      "Iraqi Dinar (IQD)",
      "Irish Pound (IEP)",
      "Israeli New Shekel (ILS)",
      "Israeli Pound (ILP)",
      "Italian Lira (ITL)",
      "Jamaican Dollar (JMD)",
      "Japanese Yen (JPY)",
      "Jordanian Dinar (JOD)",
      "Kazakhstani Tenge (KZT)",
      "Kenyan Shilling (KES)",
      "Kuwaiti Dinar (KWD)",
      "Kyrgystani Som (KGS)",
      "Laotian Kip (LAK)",
      "Latvian Lats (LVL)",
      "Latvian Ruble (LVR)",
      "Lebanese Pound (LBP)",
      "Lesotho Loti (LSL)",
      "Liberian Dollar (LRD)",
      "Libyan Dinar (LYD)",
      "Lithuanian Litas (LTL)",
      "Lithuanian Talonas (LTT)",
      "Luxembourg Financial Franc (LUL)",
      "Luxembourgian Convertible Franc (LUC)",
      "Luxembourgian Franc (LUF)",
      "Macanese Pataca (MOP)",
      "Macedonian Denar (MKD)",
      "Malagasy Ariary (MGA)",
      "Malagasy Franc (MGF)",
      "Malawian Kwacha (MWK)",
      "Malaysian Ringgit (MYR)",
      "Maldivian Rufiyaa (MVR)",
      "Malian Franc (MLF)",
      "Maltese Lira (MTL)",
      "Maltese Pound (MTP)",
      "Mauritanian Ouguiya (MRO)",
      "Mauritian Rupee (MUR)",
      "Mexican Investment Unit (MXV)",
      "Mexican Peso (MXN)",
      "Moldovan Cupon (MDC)",
      "Moldovan Leu (MDL)",
      "Monegasque Franc (MCF)",
      "Mongolian Tugrik (MNT)",
      "Moroccan Dirham (MAD)",
      "Moroccan Franc (MAF)",
      "Mozambican Escudo (MZE)",
      "Mozambican Metical (MZN)",
      "Myanmar Kyat (MMK)",
      "Namibian Dollar (NAD)",
      "Nepalese Rupee (NPR)",
      "Netherlands Antillean Guilder (ANG)",
      "New Taiwan Dollar (TWD)",
      "New Zealand Dollar (NZD)",
      "Nicaraguan Córdoba (NIO)",
      "Nigerian Naira (NGN)",
      "North Korean Won (KPW)",
      "Norwegian Krone (NOK)",
      "Omani Rial (OMR)",
      "Pakistani Rupee (PKR)",
      "Panamanian Balboa (PAB)",
      "Papua New Guinean Kina (PGK)",
      "Paraguayan Guarani (PYG)",
      "Peruvian Inti (PEI)",
      "Peruvian Sol (PEN)",
      "Philippine Peso (PHP)",
      "Polish Zloty (PLN)",
      "Portuguese Escudo (PTE)",
      "Portuguese Guinea Escudo (GWE)",
      "Qatari Rial (QAR)",
      "RINET Funds (XRE)",
      "Rhodesian Dollar (RHD)",
      "Romanian Leu (RON)",
      "Russian Ruble (RUB)",
      "Rwandan Franc (RWF)",
      "Salvadoran Colón (SVC)",
      "Samoan Tala (WST)",
      "Saudi Riyal (SAR)",
      "Serbian Dinar (RSD)",
      "Seychellois Rupee (SCR)",
      "Sierra Leonean Leone (SLL)",
      "Singapore Dollar (SGD)",
      "Slovak Koruna (SKK)",
      "Slovenian Tolar (SIT)",
      "Solomon Islands Dollar (SBD)",
      "Somali Shilling (SOS)",
      "South African Rand (ZAR)",
      "South African Rand (financial) (ZAL)",
      "South Korean Won (KRW)",
      "South Sudanese Pound (SSP)",
      "Soviet Rouble (SUR)",
      "Spanish Peseta (ESP)",
      "Spanish Peseta (A account) (ESA)",
      "Spanish Peseta (convertible account) (ESB)",
      "Sri Lankan Rupee (LKR)",
      "St. Helena Pound (SHP)",
      "Sudanese Pound (SDG)",
      "Surinamese Dollar (SRD)",
      "Surinamese Guilder (SRG)",
      "Swazi Lilangeni (SZL)",
      "Swedish Krona (SEK)",
      "Swiss Franc (CHF)",
      "Syrian Pound (SYP)",
      "São Tomé & Príncipe Dobra (STD)",
      "Tajikistani Ruble (TJR)",
      "Tajikistani Somoni (TJS)",
      "Tanzanian Shilling (TZS)",
      "Thai Baht (THB)",
      "Timorese Escudo (TPE)",
      "Tongan Paʻanga (TOP)",
      "Trinidad & Tobago Dollar (TTD)",
      "Tunisian Dinar (TND)",
      "Turkish Lira (TRY)",
      "Turkmenistani Manat (TMT)",
      "US Dollar (USD)",
      "US Dollar (Next day) (USN)",
      "US Dollar (Same day) (USS)",
      "Ugandan Shilling (UGX)",
      "Ukrainian Hryvnia (UAH)",
      "Ukrainian Karbovanets (UAK)",
      "United Arab Emirates Dirham (AED)",
      "Uruguayan Peso (UYU)",
      "Uruguayan Peso (Indexed Units) (UYI)",
      "Uzbekistani Som (UZS)",
      "Vanuatu Vatu (VUV)",
      "Venezuelan Bolívar (VEF)",
      "Vietnamese Dong (VND)",
      "WIR Euro (CHE)",
      "WIR Franc (CHW)",
      "West African CFA Franc (XOF)",
      "Yemeni Dinar (YDD)",
      "Yemeni Rial (YER)",
      "Zambian Kwacha (ZMW)",
    ],
    total: 231,
  },
  {
    name: "Cypto",
    label: [
      "Bitcoin (BTC)",
      "Ethereum (ETH)",
      "Tether (USDT)",
      "BNB (BNB)",
      "USD Coin (USDC)",
      "XRP (XRP)",
      "Cardano (ADA)",
      "Dogecoin (DOGE)",
      "Polygon (MATIC)",
      "Solana (SOL)",
      "Polkadot (DOT)",
      "Litecoin (LTC)",
      "Shiba Inu (SHIB)",
      "Tron (TRX)",
      "Avalanche (AVAX)",
      "Dai (DAI)",
      "Wrapped Bitcoin (WBTC)",
      "Chainlink (LINK)",
      "Uniswap (UNI)",
    ],
    total: 19,
  },
];
const dataCheckBox = ["1 - 3 days", "4 - 7 days", "7 - 14 days"];
const dataCheckBox1 = [
  "Within a few months",
  "On demand",
  "everyday",
  "Within a few days",
  "Within a few weeks",
];

const Merchant = () => {
  const [merchantDelay, setMerchantDelay] = useState([]);
  const [merchantFrequency, setMerchantFrequency] = useState([]);
  const [merchantSupportedCountries, setMerchantSupportedCountries] = useState(
    {}
  );
  const [merchantSupportedCurrencies, setmerchantSupportedCurrencies] =
    useState({});

  // checkbox  klocalstorage
  const handleCheckboxChange01 = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMerchantDelay((prev) => {
        if (!prev.includes(value)) {
          return [...prev, value];
        }
        return prev;
      });
      localStorage.setItem(value, checked);
    } else {
      setMerchantDelay((prev) => prev.filter((item) => item !== value));
      localStorage.removeItem(value);
    }
  };

  useEffect(() => {
    dataCheckBox.forEach((checkData) => {
      if (localStorage.getItem(checkData)) {
        setMerchantDelay((prev) => [...prev, checkData]);
      }
    });
  }, []);
  
  // checkbox1  localstorage
  const handleCheckboxChange02 = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMerchantFrequency((prev) => {
        if (!prev.includes(value)) {
          return [...prev, value];
        }
        return prev;
      });
      localStorage.setItem(value, checked);
    } else {
      setMerchantFrequency((prev) => prev.filter((item) => item !== value));
      localStorage.removeItem(value);
    }
  };

  useEffect(() => {
    dataCheckBox1.forEach((checkData) => {
      if (localStorage.getItem(checkData)) {
        setMerchantFrequency((prev) => [...prev, checkData]);
      }
    });
  }, []);

  function handleChildStateChange1(childState) {
    setMerchantSupportedCountries(childState);
  }
  function handleChildStateChange2(childState) {
    setmerchantSupportedCurrencies(childState);
  }
  //     const dataCheckBox = [
  //   {
  //     title: "Merchant settlement delay",
  //     data: ["1 - 3 days", "4 - 7 days", "7 - 14 days"],
  //   },
  //   {
  //     title: "Merchant settlement frequency",
  //     data: [
  //         "On demand",
  //         "everyday",
  //         "Within a few days",
  //         "Within a few weeks",
  //         "Within a few months",
  //     ],
  //   },
  // ];

  const multiData = [
    {
      title: "Supported countries of incorporation ",
      optional: "optional",
      allData: [
        {
          continent: continents,
          functionProp: handleChildStateChange1,
        },
      ],
    },
    {
      title: "Supported settlement currencies",
      optional: "optional",
      allData: [
        {
          continent: currencies,
          functionProp: handleChildStateChange2,
        },
      ],
    },
  ];

  // posting data starts here
  // const postData = async () => {
  //   let authKey = JSON.parse(localStorage.getItem("login"));
  //   let token = "Bearer " + authKey.access_token;
  //   console.log(token);
  //   try {
  //     const response = await axios({
  //       url: "https://portal.payprocc.com/api/merchant",

  //       headers: {
  //         accept: "application/json",
  //         Authorization: token,
  //       },
  //       data: {
  //         marchent_settlement_days: JSON.stringify(merchantDelay),
  //         marchent_settlement_frequency: JSON.stringify(merchantDelay),
  //       },
  //       method: 'post'
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // if (confirmPost) {
  //   // postData();
  //   console.log("sucess");
  //   console.log("merchant delay", merchantDelay);
  //   console.log("merchant frequency", merchantFrequency);
  // }
  // posting data ends here
  localStorage.setItem("merchantDelay", merchantDelay);
  localStorage.setItem("merchantFrequency", merchantFrequency);

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
                  onChildStateChange={data.functionProp}
                  options={data.continent}
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
                  onChange={handleCheckboxChange01}
                  checked={merchantDelay && merchantDelay.includes(checkData)}
                />
                <span className="ml-2">{checkData}</span>
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
        {dataCheckBox1.map((checkData, index) => {
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
                  onChange={handleCheckboxChange02}
                  checked={merchantFrequency && merchantFrequency.includes(checkData)}
                />
                <span className="ml-2">{checkData}</span>
              </label>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Merchant;
