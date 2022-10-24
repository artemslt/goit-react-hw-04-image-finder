import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Overlay, ModalContant } from './Modal.styled';

export const Modal = ({ contentId, list, onClick }) => {
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    const element = list.find(({ id }) => id === contentId);
    setModalUrl(element.largeImageURL);
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [list, contentId, onClick]);

  return (
    <Overlay>
      <ModalContant onClick={onClick}>
        <img src={modalUrl} alt="" />
      </ModalContant>
    </Overlay>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  contentId: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
