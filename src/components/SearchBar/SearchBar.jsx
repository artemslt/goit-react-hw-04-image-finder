import {
  Header,
  SearchButton,
  SearchForm,
  SearchInput,
} from './SearchBar.styled';

import { BiSearch } from 'react-icons/bi';

export const SearchBar = ({ handekSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={handekSubmit}>
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
