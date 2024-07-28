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
    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
      return null;
    } else {
      throw error;
    }
  } finally {
    controller.abort();
  }
};

const ApiContext = createContext();
export const ApiContextProvider = ({ children }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [homePageImagesArr, setHomePageImagesArr] = useState([]);
  /*
  the things I have to do:
    - make an api request for random images when home page is loaded
    - implement virtual scrolling to reduce memory use
  */
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getFromApi(
        "https://api.unsplash.com/photos?per_page=30"
      );
      setHomePageImagesArr(images);
    };
    fetchImages();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        getFromApi,
        apiKey,
        homePageImagesArr,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
