import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MultiLevelMenu = ({ title, optional }) => {
  return (
    <div className="grid grid-cols-1 gap-4 my-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl md:text-2xl">{title}</h1>

        <p className=" ml-8 text-slate-400 font-extralight">{optional}</p>
      </div>
      <div className="">
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={supportedCurrencies}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              className="bg-slate-100 rounded-md outline-none w-[60%]"
            />
          )}
          sx={""}
        />
      </div>

      {}
    </div>
  );
};

export default MultiLevelMenu;

const supportedCurrencies = [
  " Afghan Afghani (AFN)",
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
];
