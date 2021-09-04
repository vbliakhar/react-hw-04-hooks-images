import React from "react";
import PropTypes from "prop-types";
const ImageGalleryItem = ({ image, largeImg }) => {
  return (
    <>
      <li className="ImageGalleryItem">
        <img
          src={image.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={largeImg}
        />
      </li>
    </>
  );
};
ImageGalleryItem.propTypes = {
  largeImg: PropTypes.func.isRequired,
  // webformatURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
