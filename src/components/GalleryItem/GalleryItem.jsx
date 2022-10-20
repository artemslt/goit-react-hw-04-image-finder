import PropTypes from 'prop-types';

import { ImageGalleryItem, ImageGalleryItemImage } from './GalleryItem.styled';

export const GalleryItem = ({ id, previewURL, onClick, imgClick }) => {
  return (
    <ImageGalleryItem onClick={onClick}>
      <ImageGalleryItemImage
        onClick={() => {
          imgClick(id);
        }}
        src={previewURL}
        alt=""
      />
    </ImageGalleryItem>
  );
};

GalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  previewURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imgClick: PropTypes.func.isRequired,
};
