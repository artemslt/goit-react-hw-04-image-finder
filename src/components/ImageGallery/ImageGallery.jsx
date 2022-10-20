import PropTypes from 'prop-types';

import { GalleryItem } from 'components/GalleryItem/GalleryItem';
import { Wrapper } from './ImageGallery.styled';

export const ImageGallery = ({ arrImgs, onClick, setModalId }) => {
  return (
    <Wrapper>
      {arrImgs.map(({ webformatURL, id }) => (
        <GalleryItem
          previewURL={webformatURL}
          key={id}
          onClick={onClick}
          id={id}
          imgClick={setModalId}
        />
      ))}
    </Wrapper>
  );
};

ImageGallery.propTypes = {
  arrImgs: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  setModalId: PropTypes.func.isRequired,
};
