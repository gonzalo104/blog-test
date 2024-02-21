import React from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { postsGetAll } from '../../actions/posts';

export const Search = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch( postsGetAll(1, 9, e.target.value) );
  }
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Buscar..."
        className="mr-2"
        aria-label="Buscar"
        onChange={handleChange}
      />
    </Form>
  );
}