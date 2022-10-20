import PropTypes from 'prop-types';
import {
  Header,
  SearchButton,
  SearchForm,
  SearchInput,
} from './SearchBar.styled';

import { BiSearch } from 'react-icons/bi';

export const SearchBar = ({ handelSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={handelSubmit}>
        <SearchButton type="submit">
          <BiSearch size={'2em'} />
        </SearchButton>

        <SearchInput
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  handelSubmit: PropTypes.func.isRequired,
};
