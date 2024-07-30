import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";

const NavListDisplay = () => {
  const { navTitles } = useContext(ApiContext);
  const parentRef = useRef(null);
  const childRefs = useRef([]);
  const [isFirstChildVisible, setIsFirstChildVisible] = useState(true);
  const [isLastChildVisible, setIsLastChildVisible] = useState(false);

  const renderTopics = (array) => {
    return array.map((arr, index) => (
      <NavLink
        ref={(el) => (childRefs.current[index] = el)}
        key={index}
        to={`/s/photos/${arr}`}
        className={({ isActive }) =>
          ` block cursor-pointer px-2 box-content hover:shadow hover:text-neutral-950 whitespace-nowrap ${
            isActive
              ? "text-neutral-900 border-b-2 font-bold border-b-black "
              : "text-neutral-600"
          }`
        }
      >
        {arr}
      </NavLink>
    ));
  };
  useEffect(() => {
    const parent = parentRef.current;
    const handleScroll = () => {
      const parentRect = parent.getBoundingClientRect();
      childRefs.current.forEach((child, i) => {
        if (i == 0) {
          const childRect = child.getBoundingClientRect();
          if (childRect.left < 0) {
            setIsFirstChildVisible(false);
          } else {
            setIsFirstChildVisible(true);
          }
        } else if (i == childRefs.current.length - 1) {
          const childRect = child.getBoundingClientRect();
          if (parentRect.right + 30 > childRect.right) {
            setIsLastChildVisible(true);
          } else {
            setIsLastChildVisible(false);
          }
        }
      });
    };
    parent.addEventListener("scroll", handleScroll);

    return () => {
      parent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex gap-3 w-full relative py-4 md:py-5">
      {/* Below is the arrow to move the topic bars.
        The things i have to apply to arrows:
          - moving functionality
          - disappearing the left/right arrow when the first/last item is on the screen.
         */}
      {!isFirstChildVisible && (
        <div className=" absolute left-0 top-0 bottom-0 flex items-center bg-gradient-to-r from-white from-20% to-transparent sm:pr-6 md:pr-10 lg:pr-16">
          <IoIosArrowBack
            className="hover:text-gray-700  h-full w-1/3 cursor-pointer md:w-1/2"
            onClick={() => {
              const parent = parentRef.current;
              parent.scrollTo({
                left: parent.scrollLeft - 150,
                behavior: "smooth",
              });
            }}
          />
        </div>
      )}
      <div
        ref={parentRef}
        className="flex gap-3 w-full overflow-x-scroll no-scrollbar transition-all"
      >
        {renderTopics(navTitles)}
      </div>
      {!isLastChildVisible && (
        <div className=" bg-gradient-to-r from-transparent to-white to-80% absolute right-0 top-0 bottom-0 flex items-center justify-end  sm:pl-6 md:pl-10 lg:pl-16">
          <IoIosArrowForward
            className="hover:text-gray-700  h-full w-1/3 cursor-pointer md:w-1/2"
            onClick={() => {
              const parent = parentRef.current;
              parent.scrollTo({
                left: parent.scrollLeft + 150,
                behavior: "smooth",
              });
            }}
          />
        </div>
      )}
    </section>
  );
};

export default NavListDisplay;
