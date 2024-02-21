import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { createOrUpdatePost, openOrCloseAddOrEdit } from '../../actions/posts';
import Spinner from 'react-bootstrap/Spinner';

export const AddOrEditModal = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const { isOpenAddOrEdit, typeForm, selectedPost, loadingCreateOrUpdated } = useSelector( state => state.post );

  const initialValues = {
    id: selectedPost.id || 0,
    title: selectedPost.title || '',
    author: selectedPost.author || '',
    content: selectedPost.content || '',
  };

  const isAddForm = typeForm === 'Add';

  const handleClose = () => dispatch( openOrCloseAddOrEdit() );

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setValidated(true);

    const values = {
      id: initialValues.id,
      title: form.title.value,
      author: form.author.value,
      content: form.content.value,
    }

    dispatch( createOrUpdatePost(values, isAddForm) );
  }

  return (
    <Modal show={isOpenAddOrEdit} onHide={handleClose}>
      <Form  onSubmit={handleSubmitForm} validated={validated} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{isAddForm ? 'Nuevo' : 'Editar'} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Título</Form.Label>
            <Form.Control
              required type="text"
              placeholder="Agregar un título al post"
              defaultValue={initialValues.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Juan Doe"
              defaultValue={initialValues.author}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
            required as="textarea"
            rows={3}
            defaultValue={initialValues.content}
            placeholder="Escribe el contenido del post"
          />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loadingCreateOrUpdated}>
            {
              loadingCreateOrUpdated &&
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </>
            }
            {loadingCreateOrUpdated ? '' : (isAddForm ? 'Agregar' : 'Guardar') }
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};