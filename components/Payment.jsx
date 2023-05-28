import React, { useState, useEffect } from "react";
import Continents from "./MultiSelect";
import axios from "axios";
import MultiSelect from "./MultiSelect";

const supportedMethods = [
  {
    name: "Cards",
    label: ["American Express", "Diners Club", "Mastercard", "VISA"],
    total: 4,
  },
  {
    name: "Wallets",
    label: ["Apple Pay", "Google Pay", "Microsoft Pay"],
    total: 3,
  },
  {
    name: "Alternative",
    label: ["After Pay", "Klarna", "UnionPay"],
    total: 3,
  },
];
const supportedIndustries = [
  {
    name: "Industries",
    label: [
      "Adult",
      "Airlines & Booking",
      "Antiques, Coins & Collectables",
      "Auto warranties",
      "Background checks",
      "Bad credit",
      "Business consulting",
      "Business opportunities",
      "CBD Oil & CBD Products",
      "Continuity billing",
      "Credit monitoring",
      "Credit repair",
      "Dating",
      "Debt collections",
      "Digital streaming",
      "Fantasy sports",
      "Gentleman's clubs",
      "Government grants",
      "Health & Beauty",
      "High-ticket coaching (Seminars & Coaching)",
      "Male enhancement",
      "Medical supplies",
      "Memberships",
      "Multi-level Marketing (MLM)",
      "Nutraceuticals",
      "Online gambling (iGaming)",
      "Online gaming",
      "Pay-day lenders",
      "Pet products",
      "Precious metals",
      "SEO / SEM / Web Design",
      "Skin & Hair care",
      "Sports betting",
      "Subscription boxes",
      "Tobacco & Cigar",
      "Travel",
      "Vape / e-Cig / e-Juice",
      "E-commerce",
      "Crypto",
    ],
    total: 39,
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

const dataCheckBox = [
  "Mail or telephone Order",
  "Hosted Checkout",
  "Point of sale",
  "Phone-based money transfer service",
  "Server-to-server integration",
];

const Payment = () => {
  const [processingPayCurrencies, setprocessingPayCurrencies] = useState({});
  const [supportedPayIndustries, setSupportedPayIndustries] = useState({});
  const [paymentPayMethods, setpaymentPayMethods] = useState({});
  
  const [supportedChannels, setsupportedChannels] = useState([]);
  
  function handleChildStateChange1(childState) {
    setprocessingPayCurrencies(childState);
  }
  function handleChildStateChange2(childState) {
    setSupportedPayIndustries(childState);
  }
  function handleChildStateChange3(childState) {
    setpaymentPayMethods(childState);
  }
  const multiData = [
    {
      title: "Supported processing currencies ",
      optional: "optional",
      allData: [
        {
           continent: currencies,
           functionProp: handleChildStateChange1,
        }
      ],
    },
    {
      title: "Supported industries",
      optional: "optional",
      allData: [
        {
           continent: supportedIndustries,
           functionProp: handleChildStateChange2,
        }
      ],
    },
    {
      title: "Suported payment methods",
      optional: "optional",
      allData: [
        {
           continent: supportedMethods,
           functionProp: handleChildStateChange3,
        }
      ],
    },
  ];
  // const handleCheckboxChange = (event) => {
  //   if (event.target.checked) {
  //     setsupportedChannels([...supportedChannels, event.target.value]);
  //   } else {
  //     setsupportedChannels(
  //       supportedChannels.filter((item) => item !== event.target.value)
  //     );
  //   }
  // };
  
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
  //         // supported_crypto_currecies: processingPayCurrencies,
  //         // supported_industries: supportedPayIndustries,
  //         // supported_payment_methods: paymentPayMethods,
  //         supported_integration_options: JSON.stringify(supportedChannels), 
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
  //   // console.log("form data is:", textFieldsData)
  //   console.log("sucess");
  // }

  useEffect(()=>{
      console.table("Payment  channels : ",supportedChannels)
      // console.table("Payment industries : ",supportedPayIndustries)
    },[supportedChannels])


    // checkbox  localstorage
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
    setsupportedChannels((prev) => {
    if (!prev.includes(value)) {
    return [...prev, value];
    }
    return prev;
    });
    localStorage.setItem(value, checked);
    } else {
    setsupportedChannels((prev) => prev.filter((item) => item !== value));
    localStorage.removeItem(value);
    }
   };

  useEffect(() => {
    dataCheckBox.forEach((checkData) => {
    if (localStorage.getItem(checkData)) {
    setsupportedChannels((prev) => [...prev, checkData]);
    }
    });
   }, []);
   localStorage.setItem("supportedChannels", supportedChannels);

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
                  onChildStateChange={data.functionProp}
                  continents={data.continent}
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
                  checked={
                    supportedChannels && supportedChannels.includes(checkData)
                  }
                />
                <span className="ml-2">{checkData}</span>
              </label>
            </>
          );
        })}
    
    </div>
  );
};

export default Payment;
