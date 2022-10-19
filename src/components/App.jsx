import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreButton/LoadMoreButton';
import { ImageGallary } from './ImageGallery/ImageGallery';

import { getImgs } from 'Api/PixabeyApi';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    imgsList: [],
    query: '',
    page: 1,
    totalPages: 0,
    modalContent: '',
    isOpenModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      try {
        const data = await getImgs(this.state.query, this.state.page);
        this.setState(({ imgsList }) => ({
          imgsList: [...imgsList, ...data.hits],
          totalPages: Math.ceil(data.totalHits / 12),
        }));
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  query = async e => {
    e.preventDefault();
    if (this.state.query === e.currentTarget.elements.search.value) {
      e.target.reset();
      return;
    }
    this.setState({
      query: e.currentTarget.elements.search.value,
      page: 1,
      totalPages: 1,
      imgsList: [],
    });
    e.target.reset();
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ isOpenModal }) => ({ isOpenModal: !isOpenModal }));
  };

  modalContentSet = itemId => {
    const { imgsList } = this.state;
    const element = imgsList.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };

  render() {
    const { query, imgsList, page, totalPages, isOpenModal } = this.state;
    return (
      <div>
        <SearchBar handekSubmit={this.query} />
        {query && (
          <ImageGallary
            onClick={this.toggleModal}
            arrImgs={imgsList}
            modalContet={this.modalContentSet}
          />
        )}
        {page !== totalPages && totalPages !== 0 && (
          <LoadMoreBtn
            title="Load more"
            loadMore={this.handleClick}
          ></LoadMoreBtn>
        )}
        {isOpenModal && (
          <Modal content={this.state.modalContent} onClick={this.toggleModal} />
        )}
      </div>
    );
  }
}
