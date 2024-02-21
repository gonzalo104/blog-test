import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { openOrCloseDetails } from '../../actions/posts';
import { formatDate } from '../../helpers/formatterDate';

export const DetailModal = () => {
  const dispatch = useDispatch();

  const { isOpenDetails, selectedPost } = useSelector( state => state.post );

  const handleClose = () => dispatch( openOrCloseDetails() );


  return (
    <Modal show={isOpenDetails} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{selectedPost.title}</Modal.Title><br/>
        </Modal.Header>
        <div className='container' style={{ padding: 20}}>
          <Card>
            <Card.Header>
                {selectedPost.author}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                  {selectedPost.content}
              </Card.Text>
              <Card.Footer>
              {formatDate(new Date(selectedPost.created_at))}
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>

    </Modal>
  );
};