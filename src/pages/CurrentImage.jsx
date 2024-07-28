import React from "react";
import sample2 from "../assets/sample2.jpg";
import ImageAuthor from "../components/subComponents/ImageAuthor";
import { FaHeart, FaRegCalendar, FaRegCopyright } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router-dom'

/*
  <sticky container> --- mobile = flex col, large= flex row
      author
      like and download buttons
  </sticky container>
  <img/>
  <details container>
      <flex div> --- mobile = flex col, large= flex row
            views
            downloads
            featured in
      </flex div>
      <div>
        title
        icon + description
        icon + published on
        icon + device
        icon + free to use under Unsplash license
      </div>
      <div> --- flex, flex-wrap
        related topics
      </div>
  </details container>
*/
/*
    - Create a header like container for image author, like button, and download button. And, this countainer should be sticky
*/
const CurrentImage = () => {
  
  return (
    <div className="mt-4 text-sm text-gray-500 sm:mt-6">
      {/* Below section should be sticky, since I don't have internet to search for I just left it as it was */}
      <section className="flex flex-col gap-2 pb-1 sm:pb-2 sm:justify-between sm:flex-row sm:gap-0">
        {/* <ImageAuthor details={sample2} /> */}
        {/* there are some work on the div below
          - click event for the heart icon ---> adds the current image details on the local storage and changes its fill into white bg into pale red.
          - download button should have different color than this one ---> i have to add some custom color in tailwind config.

           */}
        <div className="flex justify-between gap-2">
          <div className="border border-gray-200 p-1 px-2 rounded">
            <FaHeart
              className="transition-all ease-in-out fill-black/50 hover:fill-red-500  cursor-pointer"
              size={17}
            />
          </div>
          <div className="group flex items-center bg-white text-gray-500 transition border-gray-200">
            <button className="block h-full px-2 hover:z-10 hover:border-gray-700 border rounded-s  cursor-default">
              Download
            </button>
            <div className="px-2 h-full flex items-center border -translate-x-[1px] hover:z-10 hover:border-gray-700 rounded-e">
              <IoIosArrowDown className="block cursor-pointer"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1 sm:py-2">
        <img src={sample2} alt="alt of the image" />
      </section>
      <div className="flex flex-wrap justify-between gap-2 py-1 sm:py-2">
        <div>
          <p>Views</p>
          <p className="text-black">153,999</p>
        </div>
        <div>
          <p>Downloads</p>
          <p className="text-black">153,999</p>
        </div>
        <div>
          <p>Featured in</p>
          <p className="text-black">The name of the feature</p>
        </div>
      </div>
      <div>
        <div className="py-1 sm:py-2">
          <p className="text-black">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
            quidem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            ratione ipsam? Odit sint, cum maxime officia molestias vel ad
            commodi?
          </p>
        </div>
        <div className="py-1 sm:py-2">
          <div className="flex gap-2 items-center">
            <FaRegCalendar />
            <p>Published on MARCH 30, 2024 </p>
          </div>
          <div className="flex gap-2 items-center">
            <IoCameraOutline />
            <p>Name of the camera</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaRegCopyright />
            <p>Free to use under the Unsplash License</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pb-2  sm:pb-4 py-1 sm:py-2">
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum dolor</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum dolor</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem</p>
           <p className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded">Lorem ipsum dolor</p>
           
      </div>
    </div>
  );
};

export default CurrentImage;
