import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Overlay, ModalContant } from './Modal.styled';

export const Modal = ({ contentId, list, onClick }) => {
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    const element = list.find(({ id }) => id === contentId);
    setModalUrl(element.largeImageURL);
  }, [contentId, list]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const handleOverlayclick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <Overlay onClick={handleOverlayclick}>
      <ModalContant>
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
