import React from "react";
import Masonry from "react-masonry-css";
import Image from "./subComponents/ImageContainer";

const breakpointColumnsObj = {
  default: 3,
  1280: 2,
  750: 1,
};

const ImageContainer = ({ data }) => {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-6">
      {data?.map((item, index) => {
        return <Image data={item} key={index} />;
      })}
    </Masonry>
  );
};

export default ImageContainer;
