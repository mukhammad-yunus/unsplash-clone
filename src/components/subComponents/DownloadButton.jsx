import React, { useContext } from "react";
import ApiContext from "../../contexts/ApiContext";

const DownloadButton = ({ image, isOpen }) => {
  const { downloadImage } = useContext(ApiContext);
  const ratio = (width) => Math.floor((image.height / image.width) * width);
  const class_Name =
    "py-2 px-4 text-gray-900 hover:bg-black/5 cursor-pointer w-full whitespace-nowrap";

  const downloadOptions = [
    { label: "Small", width: 640 },
    { label: "Medium", width: 1920 },
    { label: "Large", width: 2400 },
    { label: "Original Size", width: "full", isOriginal: true },
  ];
  console.log(isOpen);
  const displayDownloadOpts = ({ label, width, isOriginal }) => {
    const imgURL = `${image.urls.raw}&w=${isOriginal ? image.width : width}`;
    return (
      <li
        data-purpose="not-close"
        key={label}
        className={`${class_Name} ${isOriginal ? "mt-2" : ""}`}
        onClick={() => downloadImage({ name: image.slug, url: imgURL })}
      >
        {label}
        <span className="text-gray-500">
          {isOriginal
            ? ` (${image.width} x ${image.height})`
            : ` (${width} x ${ratio(width)})`}
        </span>
      </li>
    );
  };
  return (
    <ul
      data-purpose="not-close"
      className={`absolute bg-white select-none right-0 top-full duration-300 origin-top transition-transform translate-y-2 py-2 border rounded ${
        isOpen ? "scale-y-100" : "scale-y-0"
      }`}
    >
      {downloadOptions.map((item) => displayDownloadOpts(item))}
    </ul>
  );
};

export default DownloadButton;
