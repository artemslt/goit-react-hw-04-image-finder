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
