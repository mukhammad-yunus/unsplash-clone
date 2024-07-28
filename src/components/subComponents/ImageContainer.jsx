import React from "react";
import { IoArrowDown } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ImageAuthor from "./ImageAuthor";
const Image = ({ details, data }) => {
  return (
    <Link
      to={`/photo/${data.id}`}
      className=" block relative md:overflow-hidden mb-16 md:mb-6"
    >
      {/* Below code is for the SMALLER screen */}
      <div className="mb-4 sm:hidden">
        <ImageAuthor data={data.user} detail={details} />
      </div>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className="w-full h-full"
      />
      {/* Below code is for the LARGER screen */}
      <div className="absolute hidden justify-between flex-col items-end p-4  top-0 left-0 right-0 bottom-0 cursor-zoom-in transition-all bg-black bg-opacity-30 opacity-0 hover:opacity-100 sm:flex">
        <FaHeart
          style={{ transition: "all 0.3s ease-in-out", cursor: "pointer" }}
          size={30}
          fill="white"
          onClick={(e) => e.preventDefault()}
        />
        <div className="flex justify-between items-center self-start w-full">
          <div className=" sm:text-gray-300 cursor-pointer sm:hover:text-white">
            <ImageAuthor data={data.user} detail={details} />
          </div>
          <div className="bg-white rounded text-neutral-700 px-2 py-1 transition-all hover:text-black cursor-pointer">
            <IoArrowDown size={20} onClick={(e) => e.preventDefault()} />
          </div>
        </div>
      </div>
      {/* Below code is for the SMALLER screen */}
      <div className="flex justify-between sm:hidden mt-4">
        <div className="border border-gray-200 p-1 px-2 rounded">
          <FaHeart
            onClick={(e) => e.preventDefault()}
            className="transition-all ease-in-out fill-black/50"
            size={20}
            fill="white"
          />
        </div>
        <button
          className="block border rounded px-3 text-sm"
          onClick={(e) => e.preventDefault()}
        >
          Download
        </button>
      </div>
    </Link>
  );
};

export default Image;
