import React, { useContext, useEffect } from "react";
import image from "../../assets/sample.jpg";
import ApiContext from "../../contexts/ApiContext";

const ImageAuthor = ({ data, textColor = 'text-neutral-900' }) => {
  /*
      I have to implement:
          - when user clicks the author component it should:
              -- either navigate to real unsplash page of author
              -- or I have to make a author page with their images and other stuff
          
  */

  // const { getFromApi } = useContext(ApiContext);
  // useEffect(() => {
  //   async function getCurrentImage() {
  //     const self = await getFromApi(
  //       data.links.self
  //     );
  //     console.log(self);
  //   }
  //   getCurrentImage();
  // }, []);

  return (
    <div className="flex items-center gap-2">
      <img
        src={data.profile_image.medium}
        alt="profile picture of the author of the image"
        className="block w-7 h-7 object-cover rounded-full cursor-pointer"
        onClick={(e) => e.preventDefault()}
      />
      <p
        className={`text-base ${textColor}`}
        onClick={(e) => e.preventDefault()}
      >
        {data.name}
        {/* I have to limit the number of chars to certain number */}
      </p>
    </div>
  );
};

export default ImageAuthor;
