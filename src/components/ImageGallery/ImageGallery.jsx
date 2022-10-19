import { GalleryItem } from 'components/GalleryItem/GalleryItem';
import { ImageGallery } from './ImageGallery.styled';

export const ImageGallary = ({ arrImgs, onClick, modalContet }) => {
  return (
    <ImageGallery>
      {arrImgs.map(({ webformatURL, id }) => (
        <GalleryItem
          previewURL={webformatURL}
          key={id}
          onClick={onClick}
          id={id}
          imgClick={modalContet}
        />
      ))}
    </ImageGallery>
  );
};
