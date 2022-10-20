import PropTypes from 'prop-types';

import { Vortex } from 'react-loader-spinner';

export const Loader = ({ isLoading }) => {
  return (
    <Vortex
      visible={isLoading}
      height="450"
      width="450"
      ariaLabel="vortex-loading"
      wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
