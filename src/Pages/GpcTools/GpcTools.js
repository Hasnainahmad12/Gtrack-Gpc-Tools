import React, { useRef, useState } from "react";
import gtrackIcon from "../../Images/gtrackicons.png";
import { BiSolidRightArrow } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ByDetailsPopUp from "../../Components/ByDetailsPopUp/ByDetailsPopUp";
import newRequest from "../../utils/userRequest";
import { RiseLoader } from "react-spinners";
import Swal from "sweetalert2";

const GpcTools = () => {
  const [activeTab, setActiveTab] = useState("GPC");
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [gpcList, setGpcList] = useState([]); // gpc list
  const [gpc, setGpc] = useState(null);
  const [gpcCode, setGpcCode] = useState(null); // Define gpcCode state
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectChange = (event) => {
    setSelectedSource(event.target.value);
    // if (event.target.value === 'GPC') {
    // //   setIsSubmenuVisible(true);

    // } else {
    //   setIsSubmenuVisible(false);
    // }
  };

  // this is the popup code
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // close the popup
    setOpen(false);
  };

  const handleAutoCompleteInputChange = async (
    event,
    newInputValue,
    reason
  ) => {
    if (reason === "reset" || reason === "clear") {
      setGpcList([]); // Clear the data list if there is no input
      return; // Do not perform search if the input is cleared or an option is selected
    }

    if (reason === "option") {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === "") {
      // Perform operation when input is cleared
      setGpcList([]);
      return;
    }

    setAutocompleteLoading(true);
    setSearchOpen(true);

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      let endpoint;
      if (selectedSource === "hsCode") {
        endpoint = "/searchGridItemsByItemEnglishName?searchWord=";
      } else {
        endpoint = "/searchSchemaByAttributeValueTitleOrBrickTitle?searchWord=";
      }

      const res = await newRequest.get(endpoint + newInputValue, {
        signal: abortControllerRef.current.signal,
      });
      console.log(res.data);

      const products = res.data || [];
      setGpcList(products);
      setSearchOpen(true);
      setAutocompleteLoading(false);

      //   handleCardData();
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore abort errors
        setGpcList([]); // Clear the data list if there is no input
        setAutocompleteLoading(true);
        console.error(error);
        return;
      }
      console.error(error);
      setGpcList([]); // Clear the data list if an error occurs
      setSearchOpen(false);
      setAutocompleteLoading(false);
    }
  };
  const [selectedGPCOption, setSelectedGPCOption] = useState({});

  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setGpc(value);
    if (selectedSource === "hsCode") {
      setGpcCode(value?.ItemEnglishName);
    }
    if (selectedSource === "gpc") {
      setSelectedGPCOption(
        `${value?.BrickTitle} pluse ${value?.AttributeValueTitle}`
      );
    }

    // console.log(value?.ItemEnglishName);
  };

  const handleCardApiData = async () => {
    setIsLoading(true);
    console.log(selectedGPCOption);
    // Check if the GPC option is selected when the source is 'gpc'
    if (selectedSource === "gpc" && !selectedGPCOption) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a GPC option!",
        timer: 2000,
      });
      return;
    }

    try {
      let res;
      if (selectedSource === "gpc") {
        // If the selected source is GPC, use the selectedGPCOption for the API call
        res = await newRequest.get(
          `http://gs1ksa.org:3077/api/getSimilarGrid?item=${selectedGPCOption}`
        );
      } else {
        // Use the original logic for other sources
        res = await newRequest.get(
          `http://gs1ksa.org:3077/api/findSimilarSchemas?valueTitle=${gpcCode}`
        );
      }

      console.log(res.data);
      setCardData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
        timer: 2000,
      });
    }
  };

  const [selectedItemData, setSelectedItemData] = useState(null);

  const handleOpenDetailsPopup = (itemData) => {
    handleOpen(); // Open the details popup
    setSelectedItemData(itemData);
  };

  return (
    <div>
      {isLoading && (
        <div
          className="loading-spinner-background"
          style={{
            zIndex: 9999,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
          }}
        >
          <RiseLoader
            size={18}
            color={"#6439ff"}
            // height={4}
            loading={isLoading}
          />
        </div>
      )}

      <div className="py-1">
        <div className="h-24 w-full flex justify-between flex-wrap bg-gray-100 px-4">
          <div className="p-2 w-[50%]">
            <label className="font-semibold text-sm text-slate-700">
              Source
            </label>
            <div className="relative">
              <select
                className="sm:w-[60%] w-full py-2 flex justify-start items-center px-1 rounded-md font-semibold"
                onChange={handleSelectChange}
              >
                <option>-Select Tools-</option>
                <option value="gpc">GPC</option>
                <option value="hsCode">HS-CODES</option>
                <option value="unspsc">UNSPSC</option>
                <option value="eudamed">EUDAMED</option>
                <option value="ncs">NCS</option>
              </select>
              {isSubmenuVisible && (
                <div className="absolute z-10 flex flex-col gap-2 bg-white px-4 py-2 rounded-md shadow-lg mt-2 space-y-1 ml-10 w-full sm:w-[60%]">
                  <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidRightArrow /> Family
                  </div>
                  <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidRightArrow /> Segment
                  </div>
                  <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidRightArrow /> Class title
                  </div>
                  <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidRightArrow /> Brick Title
                  </div>
                  <div className="flex justify-start items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidRightArrow /> Attribute Title
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-2 w-[50%]">
            <div className="flex justify-end gap-2 pt-4">
              <div className="w-[60%]">
                <Autocomplete
                  id="serachGpc"
                  required
                  options={gpcList}
                  getOptionLabel={(option) => {
                    return selectedSource === "hsCode"
                      ? option?.ItemEnglishName
                      : option?.AttributeValueTitle +
                          " - " +
                          option?.BrickTitle;
                  }}
                  onChange={handleGPCAutoCompleteChange}
                  value={gpc}
                  onInputChange={(event, newInputValue, params) =>
                    handleAutoCompleteInputChange(event, newInputValue, params)
                  }
                  loading={autocompleteLoading}
                  open={searchOpen}
                  onOpen={() => {
                    setSearchOpen(true); // Open the Autocomplete
                  }}
                  onClose={() => {
                    setSearchOpen(false); // Close the Autocomplete
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option
                        ? selectedSource === "hsCode"
                          ? option.ItemEnglishName
                          : option?.AttributeValueTitle +
                            " - " +
                            option?.BrickTitle
                        : "No options"}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Keywords here"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {autocompleteLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      sx={{
                        "& label.Mui-focused": {
                          color: "#00006A",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#00006A",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#000000",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#000000",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <button
                className="w-[20%] text-white font-semibold rounded-md py-2 bg-primary hover:bg-blue-800"
                onClick={handleCardApiData}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-6 px-4">
          <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
              activeTab === "GPC"
                ? "bg-primary text-white"
                : "text-black border-2 border-primary"
            } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange("GPC")}
          >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            GPC
          </span>

          <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
              activeTab === "HS-CODES"
                ? "bg-primary text-white"
                : "text-black border-2 border-primary"
            } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange("HS-CODES")}
          >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            HS-CODES
          </span>

          <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
              activeTab === "UNSPSC"
                ? "bg-primary text-white"
                : "text-black border-2 border-primary"
            } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange("UNSPSC")}
          >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            UNSPSC
          </span>

          <span
            className={`w-full py-2 flex justify-start px-1 rounded-md font-bold ${
              activeTab === "OTHER"
                ? "bg-primary text-white"
                : "text-black border-2 border-primary"
            } items-center gap-2 cursor-pointer`}
            onClick={() => handleTabChange("OTHER")}
          >
            <img src={gtrackIcon} className="w-auto h-5 ml-1" alt="" />
            Others
          </span>
        </div>

        {/* Content based on the active tab */}
        {activeTab === "GPC" && <div>{/* Content for the GPC tab */}</div>}

        {activeTab === "HS-CODES" && (
          <div>{/* Content for the HS-CODES tab */}</div>
        )}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-4">
          {cardData?.map((item, index) => {
            return (
              <article
                key={index}
                className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
              >
                <div className="relative h-28 flex items-end overflow-hidden rounded-xl">
                  {/* <img 
                            className='' 
                            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="image"
                            style={{
                                objectFit: 'contain',
                                height: '100%', margin: 'auto'
                                }}

                            /> */}
                </div>

                <div className="mt-1 p-2 flex flex-col gap-1">
                  <div className="flex flex-col justify-start items-start">
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        {selectedSource === "gpc"
                          ? item?.ItemEnglishName
                          : item?.BrickCode}
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {selectedSource === "gpc"
                          ? item?.ItemArabicName
                          : item?.BrickTitle}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-bold text-slate-700">
                        {selectedSource === "gpc"
                          ? item?.DutyRate
                          : item?.AttributeCode}
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {selectedSource === "gpc"
                          ? item?.Procedures
                          : item?.AttributeTitle}
                      </p>
                    </div>

                    {/* <p className="mt-1 font-semibold text-sm text-slate-700">Product Arabic</p> */}
                  </div>

                  <div className="">
                    <p className="mt-1 font-bold text-sm text-slate-700">
                      View Similar:
                    </p>
                    <div className="flex gap-1">
                      <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                        By Text
                      </p>
                      <p className="mt-1 text-sm text-slate-700 border-2 border-gray-400 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
                        By Image
                      </p>
                      <p className="">
                        {/* By Details */}
                        <ByDetailsPopUp
                          handleClosePopUp={handleClose}
                          handleOpenPopUp={() => handleOpenDetailsPopup(item)}
                          openPopUp={open}
                          title={"By Details"}
                          apiResponse={selectedItemData}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GpcTools;
