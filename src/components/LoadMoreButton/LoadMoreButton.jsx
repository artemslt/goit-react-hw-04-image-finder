import { LoadBtn } from './LoadMoreButton.styled';

export const LoadMoreBtn = ({ title, loadMore }) => {
  return (
    <>
      <LoadBtn type="button" onClick={loadMore}>
        {title}
      </LoadBtn>
    </>
  );
};
