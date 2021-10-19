import React from 'react';
import Google from 'media/google_logo.png';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className='max-w-md w-full space-y-8'>
        <h2 className='my-6 text-center text-3xl font-extrabold text-gray-700'>
          Inicia sesión en tu cuenta
        </h2>
        </div>
      <div className='max-w-md w-full'>

          <button
            onClick={() => loginWithRedirect()}
            type='submit'
            className='group relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-full text-gray-700 bg-purple-200 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform hover:scale-110'
          >
            <div className='flex items-center justify-start'>
              <img src={Google} alt='Logo Google' className='h-6 w-6' />
              <span className='mx-4'>Continúa con Google</span>
            </div>
          </button>

      </div>
    </>
  );
};

export default Login;
