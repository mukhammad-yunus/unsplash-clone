import React, { useContext } from "react";
import Header from "../components/Header";
import ImageContainer from "../components/ImagesContainer";
import ApiContext from "../contexts/ApiContext";

const Home = () => {
  const {homePageImagesArr}= useContext(ApiContext)
  
  /*
      This is the home page. In this home page there are two components, header and image container.
  */
 console.log();
  return (
    <div className="mt-4 sm:mt-6 ">
      {Boolean(homePageImagesArr.length)? <><Header />
        <ImageContainer data={homePageImagesArr}/></>: <p>Loading</p>}
    </div>
  );
};

export default Home;
