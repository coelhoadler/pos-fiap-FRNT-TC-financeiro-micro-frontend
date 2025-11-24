
import React from "react";
import { TSocialMedia } from "../../../types/generic/TSocialMedia";

const SocialMedia = ({ text, className, href, image }: TSocialMedia) => {
  return (
    <div
      className={`relative hover:scale-110 transition-all ${
        className ? className : ""
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={text}
        className="text-[0px] cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block "
      >
        {text}
      </a>
      <img src={image} alt={text} className="w-7 h-7" />
    </div>
  );
};

export default SocialMedia;
