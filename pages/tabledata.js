import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import GoVerified from "react-icons/go";
import Verified from "../public/verified.png";
import NonVerified from "../public/nonVerified.png";
import Image from "next/image";
import Logo from "../public/Favicon/logo.ico";

const TableData = ({ role }) => {
  const [contactFormData, setContactFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [createRow, setCreateRow] = useState(false);
  const [successmanager, setSuccesmanager] = useState(false);
  const [indexList, setIndexList] = useState([]);
  const [dashboard, setDashboard] = useState(true);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const startIndex = currentPage * rowsPerPage;
  const endIndex = (currentPage + 1) * rowsPerPage;

  useEffect(() => {
    // fetchData();
    fetchMerchantData();
    console.log("The Verified users are : ", indexList);
    if (role === "manager") {
      setSuccesmanager(true);
    }
  }, []);
  // dashboard hidden or visible
  const handleDashboard = () => {
    setDashboard(!dashboard);
  };

  // handle verify starts here

  useEffect(() => {
    const storedIndexList = JSON.parse(localStorage.getItem("indexList")) || [];
    setIndexList(storedIndexList);
  }, []);

  const handleVerify = (index) => {
    let storedIndexList = JSON.parse(localStorage.getItem("indexList")) || [];
    if (!storedIndexList.includes(index)) {
      storedIndexList = [...storedIndexList, index];
    } else {
      storedIndexList = storedIndexList.filter((i) => i !== index);
    }
    localStorage.setItem("indexList", JSON.stringify(storedIndexList));
    setIndexList(storedIndexList);
    console.log("verified merchants are : ", storedIndexList);
  };

  // handle verify ends here

  const nextPage = () => {
    if (currentPage < Math.ceil(contactFormData.length / rowsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  // console.log("Role is :",role)
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchMerchantData = () => {
    let authKey = JSON.parse(localStorage.getItem("login"));
    if (!authKey || !authKey.access_token) {
      // Redirect to the '/' page
      router.push("/");
      return;
    }
    let token = "Bearer " + authKey.access_token;
    // console.log(token);
    axios({
      url: "https://portal.payprocc.com/api/merchant",
      headers: {
        accept: "application/json",
        Authorization: token,
      },
      data: {},
      method: "get",
    })
      .then((response) => {
        console.log("Data From API: ", response.data);
        setContactFormData(response?.data.Data);
        // console.log("Data in the Variable : ", merchantData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateVerify = () => {
    let authKey = JSON.parse(localStorage.getItem("login"));
    if (!authKey || !authKey.access_token) {
      // Redirect to the '/' page
      router.push("/");
      return;
    }
    let token = "Bearer " + authKey.access_token;
    // console.log(token);
    indexList.forEach((id) => {
      axios({
        url: `https://portal.payprocc.com/api/merchant/${id}`,
        headers: {
          accept: "application/json",
          Authorization: token,
        },
        data: {
          verified: true,
        },
        method: "put",
      })
        .then((response) => {
          console.log("Updated API: ", response.data);
          // setContactFormData(response?.data.Data);
          // console.log("Data in the Variable : ", merchantData);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  useEffect(() => {
    console.log("data from variable", contactFormData);
  }, [contactFormData]);

  // search box value
  useEffect(() => {
    console.log("The Search value is :", searchText);
  }, [searchText]);

  // filtering seaerch starts here

  let filteredData = contactFormData;
  if (searchText) {
    filteredData = contactFormData.filter(
      (item) =>
        (item["Business Name"] && item["Business Name"].includes(searchText)) ||
        (item["Website"] && item["Website"].includes(searchText))
    );

    filteredData.sort((a, b) => {
      // calculate the match score for items a and b
      const aScore = calculateMatchScore(a, searchText);
      const bScore = calculateMatchScore(b, searchText);

      // sort items in descending order of match score
      return bScore - aScore;
    });
  }

  function calculateMatchScore(item, searchText) {
    // calculate the match score for an item based on how closely it matches the search text
    let score = 0;

    if (item["Business Name"] && item["Business Name"].includes(searchText)) {
      score += 1;
    }

    if (item["Website"] && item["Website"].includes(searchText)) {
      score += 1;
    }

    return score;
  }

  // filtering seaerch ends here

  return (
    <div className="flex flex-row w-full h-[100vh] z-30">
      {dashboard ? (
        <>
          <div className="w-[20vw] h-[120%] bg-[#111827] rounded-lg -mt-[20vh] flex flex-col ">
            <Image
              src={Logo}
              alt="logo"
              className="w-[6vw] h-auto cursor-pointer object-contain my-8 ml-5"
            />
            <div
              className="w-full h-15 p-5 flex items-center bg-[#374151] rounded-lg uppercase font-semibold mt-[30%] focus:outline-none cursor-pointer"
              // onClick={handleDashboard}
            >
              <h2>Dashboard</h2>
            </div>
            <span className="mt-auto mb-32 mx-auto">
              PayProcc Admin Dashboard 
              <br/>
              Made with ❤ 
              <br/> 
              © PayProcc 2023 All Rights Reserved
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex flex-1 flex-col justify-evenly bg-[#1E2125] h-auto p-6">
        {/* calender and search box */}
        <div className="flex justify-between items-center mx-4 h-[15vh]">
          <div className="calender col-start-1 col-end-3 my-auto ">
            <div className="rounded-[10px] border-none w-[30vw] flex justify-between items-center">
              <label className="w-auto">Select Period</label>
              <div className="bg-[#374151] rounded-lg font-semibold flex ">
                <input
                  type="date"
                  className="bg-transparent text-white focus:outline-none py-2 mx-2"
                />
                <input
                  type="date"
                  className="bg-transparent text-white focus:outline-none rounded-lg py-2 mx-2"
                />
              </div>
            </div>
          </div>
          <div className="search col-end-7 col-span-2  my-auto">
            <div className="w-[100%] h-12 bg-[#374151] text-white flex items-center rounded-lg justify-around p-2 outline-none font-semibold">
              <input
                className="w-full h-full pl-2 bg-transparent focus:outline-none"
                type="text"
                placeholder="Search"
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M21 21l-4.35-4.35M21 21l-4.35-4.35M9 9a5 5 0 110 10 5 5 0 010-10z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* tabel data  */}
        <div className="py-5 h-auto bg-gray-700 rounded-lg overflow-auto hidden md:block">
          <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-700 text-white">
                <tr className="text-center">
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    ID
                  </th>
                  <th className="py-3 text-sm font-semibold tracking-wide text-left">
                    Business Name
                  </th>
                  <th className="py-3 text-sm font-semibold tracking-wide text-left">
                    Website
                  </th>

                  <th className=" text-sm font-semibold tracking-wide text-left w-auto">
                    Verified Status
                  </th>
                  {successmanager ? (
                    <th className="py-3 text-sm font-semibold tracking-wide text-left">
                      Verify
                    </th>
                  ) : (
                    <></>
                  )}
                  <th className="py-3 text-sm font-semibold tracking-wide text-left">
                    {/* Provider Type */}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                {Array.isArray(filteredData) &&
                  filteredData
                    .slice(startIndex, endIndex)
                    .map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr
                            key={index}
                            className="bg-[#111827] mt-6 h-[10vh] rounded-lg text-start"
                          >
                            <td className="p-3 text-sm text-green-500 font-semibold whitespace-nowrap ">
                              {item.id}
                            </td>
                            <td className="p-3 text-sm text-white  whitespace-nowrap">
                              {item["Business Name"]}
                            </td>
                            <td className="p-3 text-sm text-white  whitespace-nowrap">
                              {item.Website}
                            </td>

                            <td className="p-3 text-sm text-white whitespace-nowrap">
                              {/* {item["Job Title"]} */}
                              <Image
                                src={
                                  indexList.includes(item.id) ||
                                  item.verified
                                    ? Verified
                                    : NonVerified
                                }
                                alt="verified"
                                className="w-auto h-6 text-green-500 ml-8"
                              />
                            </td>
                            {successmanager ? (
                              <td className="p-3 text-sm text-white  whitespace-nowrap">
                                <button
                                  className={`rounded-lg ${
                                    indexList.includes(item.id) ||
                                    item.verified
                                      ? "bg-green-500"
                                      : "bg-slate-500"
                                  }
                              bg-opacity-60 text-white p-2 cursor-pointer focus:outline-none`}
                                  onClick={() => {
                                    handleVerify(item.id);
                                    updateVerify()
                                    // updateAttributes();
                                    // handleUpdateVerify(item.id)
                                  }}
                                >
                                  Verify
                                </button>
                              </td>
                            ) : (
                              ""
                            )}
                            <td className="p-3 text-sm text-white  whitespace-nowrap">
                              <button
                                className=" text-white"
                                onClick={() => {
                                  setSelectedRow(index);
                                  setCreateRow(!createRow);
                                }}
                              >
                                <span className="text-md font-semibold">
                                  &#x25BC;
                                </span>
                              </button>
                            </td>
                          </tr>
                          {createRow ? (
                            <>
                              {selectedRow === index && (
                                <tr>
                                  <td colSpan="7">
                                    <div className="bg-[#111827] bg-opacity-80 p-4 my-1 h-auto">
                                      <span className="bg-green-500 bg-opacity-50 p-2 rounded-lg">
                                        Genaeral :
                                      </span>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Website:
                                        </span>
                                        <br />
                                        {item.Website === null ||
                                        item.Website === ""
                                          ? "No Website Name"
                                          : item.Website}
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Business Name:
                                        </span>
                                        <br />
                                        {item["Business Name"] === null ||
                                        item["Business Name"] === ""
                                          ? "No Business Name"
                                          : item["Business Name"]}
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Description:
                                        </span>
                                        <br />
                                        {item.Description === null ||
                                        item.Description === ""
                                          ? "No Description"
                                          : item.Description}
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Company Headquators:
                                        </span>{" "}
                                        <br />
                                        Algeria Angola Benin Botswana Burkina
                                        Faso Burundi
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Legal Name:
                                        </span>
                                        <br />
                                        {item["Legal Entity Name"] === null ||
                                        item["Legal Entity Name"] === ""
                                          ? "no Legal name"
                                          : item["Legal Entity Name"]}
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Service Provider:
                                        </span>
                                        <br />
                                        Acquirer Processor Gateway Digital
                                        Wallet
                                      </p>
                                    </div>
                                    <div className="bg-[#111827] bg-opacity-80 p-4 my-1 h-auto">
                                      <span className="bg-green-500 bg-opacity-50 p-2 rounded-lg">
                                        Payment Features :
                                      </span>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Supported processing currencies:
                                        </span>
                                        <br />
                                        Algeria, Angola, Benin, Botswana,
                                        Burkina, Faso Burundi
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Supported industries :
                                        </span>
                                        <br />
                                        Adult, Auto, Warranties, Bad Credit,
                                        Dating
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Suported payment methods:
                                        </span>
                                        <br />
                                        Master Card VISA Apple Pay Google Pay
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Supported channel & integration
                                          option:
                                        </span>
                                        <br />
                                        Mail or telephone Order, Point of sale,
                                        Phone-based money transfer service
                                      </p>
                                    </div>
                                    <div className="bg-[#111827] bg-opacity-80 p-4 my-1 h-auto">
                                      <span className="bg-green-500 bg-opacity-50 p-2 rounded-lg">
                                        Merchant Terms :
                                      </span>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Supported countries of incorporation:
                                        </span>
                                        <br />
                                        Algeria, Angola, Benin, Botswana,
                                        Burkina, Faso Burundi
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Supported settlement currencies:
                                        </span>
                                        <br />
                                        Afgani Afghan, Armenian, Australian
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Merchant settlement delay:
                                        </span>
                                        <br />1 - 3 days, 7 - 14 days
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Merchant settlement frequency:
                                        </span>
                                        <br />
                                        On demand, Within a few days, Within a
                                        few months
                                      </p>
                                    </div>
                                    <div className="bg-[#111827] bg-opacity-80 p-4 my-1 h-auto">
                                      <span className="bg-green-500 bg-opacity-50 p-2 rounded-lg">
                                        Upload Files :
                                      </span>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Upload your Company Presentation:
                                        </span>
                                        <br />
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Upload your Merchant Application Form:
                                        </span>
                                        <br />
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Upload your PCI DSS Compliance Report
                                          (AOC / ROC):
                                        </span>
                                        <br />
                                      </p>
                                      <p className="h-auto my-4">
                                        <span className="font-semibold">
                                          Proof of compliance to PSD2/RTS:
                                        </span>
                                        <br />
                                      </p>
                                    </div>
                                    <div className="bg-[#111827] bg-opacity-80 p-4 my-1 h-auto">
                                      {" "}
                                      {item.Contacts.map(
                                        (contactData, index) => {
                                          return (
                                            <>
                                              <span
                                                key={index}
                                                className="bg-green-500 bg-opacity-50 p-2 rounded-lg"
                                              >
                                                Contact : {index + 1}
                                              </span>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Corporate Email:
                                                </span>
                                                <br />
                                                {contactData[
                                                  "Corporate Email"
                                                ] === null ||
                                                contactData[
                                                  "Corporate Email"
                                                ] === ""
                                                  ? "No Email Given"
                                                  : contactData[
                                                      "Corporate Email"
                                                    ]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  First Name:
                                                </span>
                                                <br />
                                                {contactData["First Name"] ===
                                                  "" ||
                                                contactData["First Name"] ===
                                                  null
                                                  ? "No First Name"
                                                  : contactData["First Name"]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Last Name:
                                                </span>
                                                <br />
                                                {contactData["Last Name"] ===
                                                  "" ||
                                                contactData["Last Name"] ===
                                                  null
                                                  ? "No Last Name"
                                                  : contactData["Last Name"]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Job Title:
                                                </span>
                                                <br />
                                                {contactData["Job Title"] ===
                                                  null ||
                                                contactData["Job Title"] === ""
                                                  ? "No Job Title "
                                                  : contactData["Job Title"]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Phone Number:
                                                </span>
                                                <br />
                                                {contactData["Phone Number"] ===
                                                  "" ||
                                                contactData["Phone Number"] ===
                                                  null
                                                  ? "No Phone Number "
                                                  : contactData["Phone Number"]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Skype ID:
                                                </span>
                                                <br />
                                                {contactData["SkypeeId"] ===
                                                  "" ||
                                                contactData["SkypeeId"] === null
                                                  ? "No Skype Id"
                                                  : contactData["SkypeeId"]}
                                              </p>
                                              <p className="h-auto my-4">
                                                <span className="font-semibold">
                                                  Telegram ID:
                                                </span>
                                                <br />
                                                {contactData["TelegramId"] ===
                                                  "" ||
                                                contactData["TelegramId"] ===
                                                  null
                                                  ? "No Telegram ID"
                                                  : contactData["TelegramId"]}
                                              </p>
                                            </>
                                          );
                                        }
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div className=" w-full flex justify-end my-4">
            <button
              onClick={prevPage}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg mx-3"
            >{` < `}</button>
            <button
              onClick={nextPage}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg mx-3"
            >{` > `}</button>
          </div>
        </div>

        {/* table for mobile */}
      </div>
    </div>
  );
};

export default TableData;
