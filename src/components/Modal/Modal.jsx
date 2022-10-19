import { Overlay, ModalContant } from './Modal.styled';

export const Modal = ({ content, onClick }) => {
  return (
    <Overlay onClick={onClick}>
      <ModalContant>
        <img src={content} alt="" />
      </ModalContant>
    </Overlay>
  );
};
