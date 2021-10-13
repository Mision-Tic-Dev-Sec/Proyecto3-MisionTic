import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated);
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return isAuthenticated ? (
      <> {children} </>
    ) : (
      <div>
        <div className='text-9xl text-red-800'>No estas autorizado.</div> 
        
        <Link to='/' className='text-6xl text-blue-800 hover:underline'>Por favor registrate</Link>
      </div>
    );
  };

export default PrivateRoute
