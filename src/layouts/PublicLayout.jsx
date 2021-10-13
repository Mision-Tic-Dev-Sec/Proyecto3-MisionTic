import React from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';

const PublicLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='h-full overflow-y-scroll bg-white'>{children}</main>
      <Footer />
    </div>
    </PrivateRoute>
  );
};

export default PublicLayout;
