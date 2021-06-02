import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class Update extends React.Component{

    

    render(){
        return(
        <>
        
        <Modal
          show={this.props.showUpdate}
          onHide={this.props.handleCloseModal}
          >
          
          <Modal.Header closeButton>
            <Modal.Title>Book Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={(e) => this.props.updateBook(e)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Book Name : </Form.Label>
                <Form.Control value={this.props.name} onChange={(e)=>this.props.updateName(e)} type="text" placeholder="Book Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Description : </Form.Label>
                <Form.Control value={this.props.description} onChange={(e)=>this.props.updateDesc(e)} type="text" placeholder="Enter Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Status : </Form.Label>
                <Form.Control value={this.props.status}  onChange={(e)=>this.props.updateStatus(e)} type="text" placeholder="Enter Status" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Image URL</Form.Label>
                <Form.Control value={this.props.img} onChange={(e)=>this.props.updateURL(e)} type="text" placeholder="Enter Image URL" />
              </Form.Group>
            <Button type='submit' variant="primary">Save Changes</Button>
            </Form>
          </Modal.Body>
          
            
        </Modal>

        </>)
    }
}

export default Update;