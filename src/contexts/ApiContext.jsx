import { createContext, useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const getFromApi = async (url) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, {
      signal,
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });
    if (!response.ok) {
      // If response is not ok, throw an error with status text
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
      return null;
    } else {
      console.error("Fetch error:", error)
      return null
    }
  } finally {
    controller.abort();
  }
};

const ApiContext = createContext();
export const ApiContextProvider = ({ children }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [homePageImagesArr, setHomePageImagesArr] = useState([]);
  const [topicsArr, setTopicsArr] = useState([])
  const [navTitles, setNavTitles] = useState([])
  /*
  the things I have to do:
    - make an api request for random images when home page is loaded
    - implement virtual scrolling to reduce memory use
  */
  useEffect(() => {
    const fetchHomePageItems = async () => {
      const images = await getFromApi(
        "https://api.unsplash.com/photos?per_page=30"
      );
      setHomePageImagesArr(images);
      const topics = await getFromApi('https://api.unsplash.com/topics?per_page=15')
      const titles = [...topics].map(topic=>topic.title)
      setNavTitles(titles)
      setTopicsArr([...topics])
      
    };
    fetchHomePageItems();

  }, []);
  const handleLikedImg = (e, image,isLiked, setIsLiked) => {
    e.preventDefault()
    const favourites =
      JSON.parse(localStorage.getItem("favourite-images")) || [];
    if (favourites.length) {
      if (isLiked) {
        const dislike = favourites.filter((item) => item.id !== image.id);
        const favourites_str = JSON.stringify(dislike);
        localStorage.setItem("favourite-images", favourites_str);
        setIsLiked(false);
      } else {
        const favourites_str = JSON.stringify([image, ...favourites]);
        localStorage.setItem("favourite-images", favourites_str);
        setIsLiked(true);
      }
    } else {
      const favourites_str = JSON.stringify([image]);
      localStorage.setItem("favourite-images", favourites_str);
      setIsLiked(true);
    }
  };
  return (
    <ApiContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        getFromApi,
        apiKey,
        homePageImagesArr,
        handleLikedImg,
        topicsArr,
        navTitles
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
