import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreButton/LoadMoreButton';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImgs } from 'Api/PixabeyApi';

export class App extends Component {
  state = {
    imgsList: [],
    query: '',
    page: 1,
    totalPages: 0,
    modalImgId: '',
    isOpenModal: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const data = await getImgs(query, page);
        this.setState(({ imgsList }) => ({
          imgsList: [...imgsList, ...data.hits],
          totalPages: Math.ceil(data.totalHits / 12),
        }));

        if (data.totalHits === 0) {
          toast.warning("Sorry, we didn't find any matching images.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (query !== prevState.query && data.totalHits !== 0) {
          toast.info(`We find ${data.totalHits} images`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error('Sorry samething  go wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setModalId = id => {
    this.setState({ modalImgId: id });
  };

  query = e => {
    e.preventDefault();
    const searchFormValue = e.currentTarget.elements.search.value;

    if (this.state.query === searchFormValue) {
      e.target.reset();
      toast.warning('Enter a new serch word, please!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    this.setState({
      query: searchFormValue,
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

  render() {
    const { query, imgsList, page, totalPages, isOpenModal, isLoading } =
      this.state;
    return (
      <Layout>
        <SearchBar handelSubmit={this.query} />
        {isLoading && <Loader isLoading={isLoading} />}
        {query && (
          <ImageGallery
            onClick={this.toggleModal}
            arrImgs={imgsList}
            setModalId={this.setModalId}
          />
        )}
        {totalPages !== 0 && page !== totalPages && (
          <LoadMoreBtn
            title="Load more"
            loadMore={this.handleClick}
          ></LoadMoreBtn>
        )}
        {isOpenModal && (
          <Modal
            contentId={this.state.modalImgId}
            list={imgsList}
            onClick={this.toggleModal}
          />
        )}
        <ToastContainer />
      </Layout>
    );
  }
}
