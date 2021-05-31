import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
// const axios = require ('axios');

class BestBooks extends React.Component{
constructor (props){
    super (props);
    this.state={
        book:[],
        show:false
    }
}

componentDidMount = async()=>{
    const { user  } = this.props.auth0;
    let book = await axios.get ('http://localhost:3001/book',{params: {email: user.email}});
console.log(book.data);
    this.setState({
        book:book.data,
        show:true
    });
}

render(){
    return(
        <>
        
          {this.state.show&&
          this.state.book.map( item => {
              return(
                <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.img}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>
                    {item.status}
                    </p>

                   
                  </Carousel.Caption>
                </Carousel.Item>
                
              </Carousel>
              )
          })}
           
       
        </>
    )
}
}

export default withAuth0(BestBooks);