import PropTypes from 'prop-types';

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

LoadMoreBtn.propTypes = {
  title: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};
