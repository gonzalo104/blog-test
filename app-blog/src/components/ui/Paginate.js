import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { postsGetAll } from '../../actions/posts';

export const Paginate = ()  => {
  const limit = 9;
  const { _meta } = useSelector( state => state.post );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( postsGetAll(1, limit) );
  }, [dispatch]);

  const metadata = _meta;

  const nextPage = () => {
    if (metadata.page_number < metadata.total_pages) {
        handlePageChange(metadata.page_number + 1);
    }
  };

  const prevPage = () => {
    if (metadata.page_number > 1) {
        handlePageChange(metadata.page_number - 1);
    }
  };

  const firstPage = () => {
    handlePageChange(1);
  };

  const lastPage = () => {
    handlePageChange(metadata.total_pages);
  };

  const handlePageChange = (pageNumber) => {
    dispatch( postsGetAll(pageNumber, limit) );
  };

  let items = [];
  let leftBoundary = Math.max(1, metadata.page_number - 2);
  let rightBoundary = Math.min(metadata.total_pages, metadata.page_number + 2);

  for (let number = leftBoundary; number <= rightBoundary; number++) {
    items.push(
        <Pagination.Item key={number} active={number === metadata.page_number} onClick={() => handlePageChange(number)}>
            {number}
        </Pagination.Item>,
    );
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
      <Pagination>
        <Pagination.First onClick={firstPage} disabled={metadata.page_number === 1} />
        <Pagination.Prev onClick={prevPage} disabled={metadata.page_number === 1} />
        {items}
        <Pagination.Next onClick={nextPage} disabled={metadata.page_number === metadata.total_pages} />
        <Pagination.Last onClick={lastPage} disabled={metadata.page_number === metadata.total_pages} />
      </Pagination>
    </div>
);
}