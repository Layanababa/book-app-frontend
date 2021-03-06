import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Update from './Update';
// const axios = require ('axios');

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      showBooks: true,
      showModal: false,
      // server: process.env.REACT_APP_SERVER_URL,
      name: '',
      img: '',
      description: '',
      status: '',
      showUpdate:false
     
    }
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    let book = await axios.get(`${process.env.REACT_SERVER}/book`, { params: { email:user.email } });
    console.log(book.data);
    this.setState({
      book: book.data,
      show: true,
      showBooks: true,
      
    });
  }

  handleClose = () => {
 
    this.setState({
      showModal: false
    })
  }
  handleShow = () => {
    
    this.setState({ showModal: true })
    

  }
  
  updateName = (event) => {
    this.setState({
      name: event.target.value
    })
    
  }
  updateDesc = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  updateURL = (event) => {
    this.setState({
      img: event.target.value
    })
  }
  updateStatus = (event) => {
    this.setState({
      status: event.target.value
    })
  }

  getBook = async (event) => {
    event.preventDefault();
    const bookFormData = {
      email:this.props.auth0.user.email,
      name: this.state.name,
      description: this.state.description,
      img: this.state.img,
      status: this.state.status,
      
      
    }
    
    const newbook = await axios.post(`${process.env.RREACT_SERVER}/addBook`, bookFormData)
    this.setState({
      book: newbook.data
    })
  }

  deleteHandler= async(index)=>{
    const email={
      email: this.props.auth0.user.email,
    }
    let newbook = await axios.delete(`${process.env.REACT_SERVER}/deleteBook/${this.state.index}`,{params:email})
    this.setState({
      book: newbook.data
    })
  }
  
  handleCloseModal = () => {
    
    this.setState({
      
      showUpdate:false
    })
  }
  updateShowHandler = (idx)=>{
    const chosenBook= this.state.book.filter((item,index)=>{
      return idx===index;
    })
    console.log(chosenBook);
    this.setState({
      showUpdate: true,
      index:idx,
// email:this.props.auth0.user.email,
name: chosenBook[0].name,
description: chosenBook[0].description,
img: chosenBook[0].img,
status: chosenBook[0].status,

})

  }

  updateBook=async(e)=>{
    e.preventDefault();
    const bookData={
      email:this.props.auth0.user.email,
      name: this.state.name,
      description: this.state.description,
      img: this.state.img,
      status: this.state.status,
    }
    let bookUpdateData= await axios.put(`${process.env.REACT_SERVER}/updateBook/${this.state.index}`,bookData)

    this.setState({
      book:bookUpdateData.data
    })
  }
  
  render() {
    return (
      <>

            <Button variant="primary" onClick={this.handleShow}>
          Add Books
      </Button>
<Update
handleShowUpdate={this.handleShowUpdate}
handleCloseModal={this.handleCloseModal}

img={this.state.img}
name={this.state.name}
description={this.state.description}
status={this.state.status}
updateBook={this.updateBook}
updateName={this.updateName}
updateDesc={this.updateDesc}
updateURL={this.updateURL}
updateStatus={this.updateStatus}
showUpdate={this.state.showUpdate}
/>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          >
          
          <Modal.Header closeButton>
            <Modal.Title>Book Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={(e) => this.getBook(e)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Book Name : </Form.Label>
                <Form.Control onChange={(e)=>this.updateName(e)} type="text" placeholder="Book Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Description : </Form.Label>
                <Form.Control onChange={(e)=>this.updateDesc(e)} type="text" placeholder="Enter Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Status : </Form.Label>
                <Form.Control onChange={(e)=>this.updateStatus(e)} type="text" placeholder="Enter Status" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Image URL</Form.Label>
                <Form.Control onChange={(e)=>this.updateURL(e)} type="text" placeholder="Enter Image URL" />
              </Form.Group>
            <Button type='submit' variant="primary">Submit</Button>
            </Form>
          </Modal.Body>
          
            
        </Modal>


        {this.state.book.length!==0 &&
          this.state.book.map((item,index) => {
            return (
              
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.img} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <h3>{item.name}</h3>
                    <p>The description: {item.description}</p>
                    <p>
                      The status: {item.status}
                    </p>
                  </Card.Text>
                  <Button onClick={()=>this.deleteHandler(index)} variant="primary">Delete Book</Button>
                  <Button onClick={()=>this.updateShowHandler(index)} variant="primary">Update Data</Button>
                </Card.Body>
              </Card>

            )
          })

        }


      </>
    )
  }
}

export default withAuth0(BestBooks);