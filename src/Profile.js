import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user  } = this.props.auth0;
    return (
        <>
            
               <img src={user.picture}/>
                    <div>Hello {user.name}</div>
                    <div>Email: {user.email}</div>

                

            
        </>
    )
  }
}

export default withAuth0(Profile);