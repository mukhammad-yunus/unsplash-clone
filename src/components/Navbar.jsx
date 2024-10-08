import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavListDisplay from "./subComponents/NavListDisplay";
import { FaHeart } from "react-icons/fa6";
import ApiContext from "../contexts/ApiContext";
// import ApiContext from "../../src copy/contexts/ApiContext";

const getHistory = () => {
  const searchArr = JSON.parse(localStorage.getItem("history"));
  if (searchArr?.length) {
    const filteredArray = searchArr.filter((item) => typeof item !== "object");
    return [...new Set(filteredArray)];
  } else {
    return [];
  }
};

const Navbar = () => {
  /*
      VARIABLES:
        - searchInputValue --> stores user search-input value
        - navigate ---> useNavigate hook is stored: a hook that lets you navigate programmatically within your React code
        - inputRef ---> refers input:text
        - searchHistory ---> stores user search history. Every reload, it gets the data from local storage
        - isInputFocused ---> a variable which stores the search input's focus state as a boolean value
        - inputParentCName --> a css class value for the parent div of search input, improvising based on the state of isInputFocused
  */
  // const {searchInputValue, setSearchInputValue} = useContext(ApiContext);
  const {searchInputValue, setSearchInputValue} = useContext(ApiContext)
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchHistory, setSearchHistory] = useState(getHistory());
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputParentCName = `w-full relative flex items-center gap-4 border border-zinc-100 rounded-full px-3 p-2 transition-all ease-in-out sm:px-5 sm:p-2 ${
    isInputFocused ? "bg-white" : "bg-zinc-100"
  }`;

  const handleSearch = (e) => {
    /*
        This function deals with search action.
        - checks if searchInputValue has some value 
        - if there is not any value, the function is executed
        - if there is a value and the trigger is "Enter" key or a button with "search" arguament:
            + search input is blurred
            + isInputFocused is set to False
            + current search input value is added to searchHistory using {new Set}
            + page is navigated to `/s/photos/${searchInputValue}`
    */
    if (!searchInputValue) return;
    if (e?.key === "Enter" || e === "search") {
      inputRef.current.blur();
      setIsInputFocused(false)
      setSearchHistory((prev) => [...new Set([searchInputValue, ...prev])]);
      navigate(`/s/photos/${searchInputValue}`);
    }
  };
  const handleHistorySearch = (item)=>{
    /*
        sets the input value as item and adds item in the first raw of the search history
    */
    setSearchInputValue(item);
    setSearchHistory((prev) => [...new Set([item, ...prev])]);
  }

  useEffect(() => {
    /*
      the useEffect deals with search history. When there is a change in searchHistory variable, it stores the variable to localStorage by:
        - converting an array into string
        - setting the string into 'history' in localStorage
    */
    const searchHistoryAs_Str = JSON.stringify(searchHistory);
    localStorage.setItem("history", searchHistoryAs_Str);
  }, [searchHistory]);

  useEffect(() => {
    /*
      The main purpose of this useEffect is to adding event listener when the page is loaded.
      So, when there is a click event:
      - the function does different actions based on the purpose of the element clicked.
      {yes, I added datasets to some of the necessary elements to mark them}
      - if the document is clicked other than an element with dataset of 'not-blur' or 'clear-history', the focus state of the search input becomes false 
      - if the element is 'clear-history':
          + checks if the history in the localStorage is empty or not
          + if empty, there is nothing to do. returns
          + if not empty:
              - the search input is unfocused
              - 'history' is removed from localStorage
              - searchHistory variable is set empty

    */
    const handleClick = (e) => {
      const purpose = e.target.dataset.purpose
      if (purpose !== 'not-blur' && purpose !=='clear-history') {
        setIsInputFocused(false);
      } else if(purpose === 'clear-history'){
        const isEmpty = !((getHistory()).length) // Checks if the local storage is empty
        setIsInputFocused(false)
        if(isEmpty) return;
        localStorage.removeItem('history');
        setSearchHistory([]);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  
  return (
    <nav className="flex flex-col sticky pt-3 px-2  md:px-3 top-0 left-0 right-0 bg-white border-b z-20">
      <section className="flex gap-2 items-center sm:gap-4">
        <div>
          <Link to='/'>
            <img
              src={logo}
              alt="Searchsplash logo; original version of Unsplash logo"
              className="w-6 sm:w-10"
            />
          </Link>
        </div>
        <div className={inputParentCName}>
          <div>
            <IoSearch
              data-purpose="not-blur"
              className={` text-gray-400 cursor-pointer hover:text-gray-950 ${
                isInputFocused && "text-gray-500"
              }`}
              onClick={() => handleSearch("search")}
            />
          </div>
          <input
            data-purpose="not-blur"
            type="text"
            className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
            placeholder="Search images"
            onFocus={() => setIsInputFocused(true)}
            // onBlur={() => setIsInputFocused(false)}
            onKeyDown={handleSearch}
            onChange={(e) => setSearchInputValue(e.target.value)}
            value={searchInputValue}
            ref={inputRef}
          />
          {isInputFocused && searchHistory.length > 0 &&  (
            <div
              data-purpose="not-blur"
              className="absolute left-0 right-0 w-full min-h-32 z-20 px-3 border translate-y-3/4 bg-white rounded-md"
            >
              <div
                data-purpose="not-blur"
                className="flex flex-wrap gap-1 py-3 sm:gap-4"
              >
                <h3 data-purpose="not-blur">Recent searches</h3>
                <p
                  data-purpose="clear-history"
                  className="underline text-neutral-300 cursor-pointer hover:text-neutral-950"
                >
                  clear
                </p>
              </div>
              <div
                data-purpose="not-blur"
                className="flex flex-wrap gap-2 pb-3"
              >
                {searchHistory?.map((item) => {
                  return (
                    <p
                      className="p-2 border rounded text-neutral-500 cursor-pointer transition-all hover:text-neutral-700 hover:bg-neutral-100"
                      onClick={()=> {
                        handleHistorySearch(item)
                        navigate(`/s/photos/${item}`)
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
          {searchInputValue && isInputFocused && (
            <RxCross2
              data-purpose="not-blur"
              className="cursor-pointer hover:text-red-500"
              onClick={() => {
                setSearchInputValue("");
                inputRef.current.focus();
              }}
              size={20}
            />
          )}
        </div>
        <NavLink
      to={`/Favorites`}
      className='flex items-center justify-center cursor-pointer box-content '
    >
      <FaHeart className="fill-red-500 text-xl sm:text-3xl lg:text-4xl"/ >
    </NavLink>
      </section>
      <NavListDisplay/>
    </nav>
  );
};

export default Navbar;
