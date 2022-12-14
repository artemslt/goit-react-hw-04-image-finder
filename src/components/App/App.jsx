import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImgs } from 'Api/PixabeyApi';

import { LoadMoreBtn, Layout } from './App.styled';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import {
  findMessage,
  notFindMessage,
  errorMessage,
  noQueryMessage,
} from '../helpers/toast';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [imgsList, setImglist] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalImgId, setModalImgId] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (query && status === Status.IDLE) {
      setStatus(Status.PENDING);
      getImgs(query, page)
        .then(data => {
          if (data.totalHits === 0) {
            notFindMessage();
          }
          if (page === 1 && data.totalHits !== 0) {
            findMessage(data.totalHits);
          }

          setImglist([...imgsList, ...data.hits]);
          setTotalPages(Math.ceil(data.totalHits / 12));
        })
        .catch(() => {
          setStatus(Status.REJECTED);
          errorMessage();
        })
        .finally(setStatus(Status.RESOLVED));
    }
  }, [query, status, page, imgsList, totalPages]);

  const handlQuery = e => {
    e.preventDefault();
    const searchFormValue = e.currentTarget.elements.search.value;

    if (query === searchFormValue || searchFormValue === '') {
      e.target.reset();
      noQueryMessage();
      return;
    }

    setQuery(searchFormValue);
    setPage(1);
    setTotalPages(1);
    setImglist([]);
    setStatus(Status.IDLE);
    e.target.reset();
  };

  const setModalId = id => {
    setModalImgId(id);
  };

  const toggleModal = () => {
    setIsOpenModal(isOpenModal => !isOpenModal);
  };

  const loadMore = () => {
    setPage(page + 1);
    setStatus(Status.IDLE);
  };

  return (
    <Layout>
      <SearchBar handelSubmit={handlQuery} />
      {status === Status.PENDING && <Loader isLoading={true} />}
      {query && (
        <ImageGallery
          onClick={toggleModal}
          arrImgs={imgsList}
          setModalId={setModalId}
        />
      )}
      {totalPages !== 0 && page !== totalPages && (
        <LoadMoreBtn onClick={loadMore}>Load more</LoadMoreBtn>
      )}
      {isOpenModal && (
        <Modal contentId={modalImgId} list={imgsList} onClick={toggleModal} />
      )}
      <ToastContainer />
    </Layout>
  );
};
