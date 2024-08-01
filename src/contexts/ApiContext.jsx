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
  const [localStorageChanged, setLocalStorageChanged] = useState(false)
  
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
    setLocalStorageChanged(prev=>!prev)
    e.preventDefault()
    const favorites =
      JSON.parse(localStorage.getItem("favorite-images")) || [];
    if (favorites.length >= 20) {
      /*
        there should be a logic for limitation of the local storage
      */
    }
    
      if (favorites.length) {
      if (isLiked) {
        const dislike = favorites.filter((item) => item.id !== image.id);
        const favorites_str = JSON.stringify(dislike);
        localStorage.setItem("favorite-images", favorites_str);
        setIsLiked(false);
      } else {
        const favorites_str = JSON.stringify([image, ...favorites]);
        localStorage.setItem("favorite-images", favorites_str);
        setIsLiked(true);
      }
    } else {
      const favorites_str = JSON.stringify([image]);
      localStorage.setItem("favorite-images", favorites_str);
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
        navTitles,
        change: localStorageChanged,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
