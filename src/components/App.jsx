import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreButton/LoadMoreButton';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImgs } from 'Api/PixabeyApi';

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
          setImglist([...imgsList, ...data.hits]);
          setTotalPages(Math.ceil(data.totalHits / 12));

          if (data.totalHits === 0) {
            toast.warning("Sorry, we didn't find any matching images.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          if (page === 1 && data.totalHits !== 0) {
            console.log('first', 1);
            toast.info(`We find ${data.totalHits} images`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch(error => {
          setStatus(Status.REJECTED);
          toast.error('Sorry samething  go wrong!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .finally(setStatus(Status.RESOLVED));
    }
  }, [query, status, page, imgsList, totalPages]);

  const setModalId = id => {
    setModalImgId(id);
  };

  const handlQuery = e => {
    e.preventDefault();
    const searchFormValue = e.currentTarget.elements.search.value;

    if (query === searchFormValue || searchFormValue === '') {
      e.target.reset();
      toast.warning('Enter a new serch word, please!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setQuery(searchFormValue);
    setPage(1);
    setTotalPages(1);
    setImglist([]);
    setStatus(Status.IDLE);
    e.target.reset();
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
        <LoadMoreBtn title="Load more" loadMore={loadMore}></LoadMoreBtn>
      )}
      {isOpenModal && (
        <Modal contentId={modalImgId} list={imgsList} onClick={toggleModal} />
      )}
      <ToastContainer />
    </Layout>
  );
};
