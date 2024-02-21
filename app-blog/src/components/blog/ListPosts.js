import React from "react";
import { Card, Button, Col, Row, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openOrCloseAddOrEdit, openOrCloseDetails, deletePost } from '../../actions/posts';
import { formatDate } from "../../helpers/formatterDate";
import { Detector } from "react-detect-offline";

export const ListPosts = ({ items }) => {
  const dispatch = useDispatch();

  const handleOpen = (post) => dispatch( openOrCloseDetails(post) );
  const handleEdit = (post) => dispatch( openOrCloseAddOrEdit('Edit', post) );
  const handleDelete = (id) => dispatch( deletePost(id) );

  return <Row>
    {
      items.map(post => (
            <Col key={post.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <Card.Title style={{ margin: '0', fontWeight: 'bold' }}>{post.title}</Card.Title>
                    <Card.Text style={{ margin: '0', fontSize: '14px', color: '#666' }}>{post.author}</Card.Text>
                  </div>
                  <Card.Text>{post.content.slice(0, 70)}...</Card.Text>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: '#f8f9fa', borderTop: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small className="text-muted" style={{ margin: '0' }}>{formatDate(post.created_at)}</small>
                  <Dropdown disabled={true}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <i className="fas fa-cog"></i>
                    </Dropdown.Toggle>
                    <Detector
                      render={({ online }) => {
                        return ( <Dropdown.Menu>
                            <Dropdown.Item disabled={!online} onClick={() => handleEdit(post)} ><i className="fas fa-edit"></i> Editar</Dropdown.Item>
                            <Dropdown.Item disabled={!online} onClick={() => handleDelete(post.id)}><i className="fas fa-trash-alt"></i> Eliminar</Dropdown.Item>
                          </Dropdown.Menu> )
                      }}
                    />
                </Dropdown>
                  <Button variant="primary" onClick={() => handleOpen(post)}>Leer más</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
    }
  </Row>
};