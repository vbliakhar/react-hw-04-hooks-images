import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
function ImageGallery({ largeImg, images }) {
  return (
    <ul className="ImageGallery">
      {images.map((image) => {
        return (
          <ImageGalleryItem
            image={image}
            key={image.id}
            largeImg={() => largeImg(image.largeImageURL)}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  largeImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      // key: PropTypes.number.isRequired,
      // largeImg: PropTypes.string.isRequired,
      // image: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;
