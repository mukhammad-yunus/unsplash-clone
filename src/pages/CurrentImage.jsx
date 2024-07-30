import React, { useContext, useEffect, useState } from "react";
import sample2 from "../assets/sample2.jpg";
import ImageAuthor from "../components/subComponents/ImageAuthor";
import Loading from "../components/Loading";
import { FaHeart, FaRegCalendar, FaRegCopyright } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ApiContext from "../contexts/ApiContext";
import DownloadButton from "../components/subComponents/DownloadButton";

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
/*      THE RULE
    If the component returns before some hook, for example, useEffect, there is an error "Rendered more hooks than during the previous render."  
*/
  const { photoId } = useParams();
  const { getFromApi, handleLikedImg } = useContext(ApiContext);
  const [isLiked, setIsLiked] = useState(() => {
    const favourites =
      JSON.parse(localStorage.getItem("favourite-images")) || [];
    if (!favourites.length) return false;
    return favourites.some((item) => item.id == photoId);
  });
  const [isDownloadbarOpen, setIsDownloadbarOpen] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  useEffect(() => {
    const getCurrentImage = async () => {
      const data = await getFromApi(
        `https://api.unsplash.com/photos/${photoId}`
      );
      setImage(data);
    };
    getCurrentImage();
  }, [photoId]);
  useEffect(() => {
    const handleClick = (e) => {
      if (image) {
        const purpose = e.target.dataset.purpose;
        if (purpose !== 'not-close' || isDownloadbarOpen) {
          setIsDownloadbarOpen(false);
        } else if (purpose === 'not-close' && !isDownloadbarOpen) {
          setIsDownloadbarOpen(true);
        }
      }

    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isDownloadbarOpen]);
  if (!image) return <Loading />;


  
  const getCreatedDate = () => {
    const dateString = image.created_at;
    // Convert the string to a Date object
    const date = new Date(dateString);
    // Use Intl.DateTimeFormat to format the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };
  const handleDownload = (width) => {
    console.log(width);
  };
  return (
    <div className="mt-4 text-sm text-gray-500 sm:mt-6">
      {/* Below section should be sticky, since I don't have internet to search for I just left it as it was */}
      <section className="flex flex-col gap-2 pb-1 sm:pb-2 sm:justify-between sm:flex-row sm:gap-0">
        <ImageAuthor data={image.user} />
        {/* there are some work on the div below
          + click event for the heart icon ---> adds the current image details on the local storage and changes its fill into white bg into pale red.
          - download button should have different color than this one ---> i have to add some custom color in tailwind config.
          - download button should have different color than this one ---> i have to add some custom color in tailwind config. 

           */}
        <div className="flex justify-between gap-2">
          <div className="border border-gray-200 p-1 px-2 rounded">
            <FaHeart
              className={`transition-all ease-in-out  cursor-pointer ${
                isLiked
                  ? "fill-red-500 hover:fill-red-200"
                  : "fill-black/50 hover:fill-black/15 "
              }`}
              size={17}
              onClick={(e) => handleLikedImg(e, image,isLiked, setIsLiked)}
            />
          </div>
          <div className="relative group flex items-center bg-white text-gray-500 transition border-gray-200">
            <button className="block h-full px-2 hover:z-10 hover:border-gray-700 border rounded-s  cursor-default">
              Download
            </button>
            <div
              data-purpose="not-close"
              className="px-2 h-full flex items-center border -translate-x-[1px] hover:z-10 hover:border-gray-700 rounded-e cursor-pointer"
            >
              <IoIosArrowDown
                data-purpose="not-close"
                className="block cursor-pointer"
              />
            </div>
            <DownloadButton
              image={image}
              isOpen={isDownloadbarOpen}
              handleDownload={handleDownload}
            />
          </div>
        </div>
      </section>

      <section className="py-1 sm:py-2">
        <img src={image.urls.regular} alt={image.alt_description} />
      </section>
      <div className="flex flex-wrap justify-between gap-2 py-1 sm:py-2">
        <div>
          <p>Views</p>
          <p className="text-black">{image.views}</p>
        </div>
        <div>
          <p>Downloads</p>
          <p className="text-black">{image.downloads}</p>
        </div>
      </div>
      <div>
        <div className="py-1 sm:py-2">
          <p className="text-black">{image.alt_description}</p>
          {image.description && <p>{image.description}</p>}
        </div>
        <div className="py-1 sm:py-2">
          <div className="flex gap-2 items-center">
            <FaRegCalendar />
            <p>Published on {getCreatedDate()} </p>
          </div>
          <div className="flex gap-2 items-center">
            <FaRegCopyright />
            <p>Free to use under the Unsplash License</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pb-2  sm:pb-4 py-1 sm:py-2">
        {/* Below line, maps through tags of the image and when cliked, the page is navigated to the search page */}
        {image.tags.map((tag) => (
          <p
            key={tag.title}
            onClick={() => navigate(`/s/photos/${tag.title}`)}
            className="bg-black/10 cursor-pointer transition-all hover:text-gray-700 hover:bg-black/15 px-3 p-1 rounded"
          >
            {tag.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CurrentImage;
