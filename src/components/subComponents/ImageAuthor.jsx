import React from "react";
import image from '../../assets/sample.jpg'

const ImageAuthor = ({data}) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={data.profile_image.medium}
        alt="profile picture of the author of the image"
        className="block w-7 h-7 object-cover rounded-full cursor-pointer"
        onClick={(e) => e.preventDefault()}
      />
      <p
        className=" text-base text-neutral-900"
        onClick={(e) => e.preventDefault()}
      >
        {`${data.first_name} ${data.last_name}`}
        {/* I have to limit the number of chars to certain number */}
      </p>
    </div>
  );
};

export default ImageAuthor;
