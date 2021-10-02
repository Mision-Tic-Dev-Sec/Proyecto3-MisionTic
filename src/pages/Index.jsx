import React from 'react';
import jamon from 'media/jamon.jpg';
import queso from 'media/queso.jpg';
import chocolate from 'media/chocolate.jpg';

const Index = () => {
  return (
    <div className='flex flex-col items-center h-full w-wfull justify-center'>
      <h1 className='text-8xl text-gray-800 my-3'>Bienvenidos</h1>
      <h2 className='text-4xl text-gray-800 my-4'>Nuestros productos</h2>
      <div className='flex w-full justify-around'>
        <div className='w-96 h-64'><img className='rounded-xl object-content h-full' src={jamon} alt="jamon"/> <span className='font-bold pl-44 text-gray-800'>Jamon</span></div>
        <div className='w-96 h-64'><img className='rounded-xl object-content h-full' src={chocolate} alt="chocolate"/> <span className='font-bold pl-44 text-gray-800'>Chocolate</span></div>
        <div className='w-96 h-64'><img className='rounded-xl object-content h-full' src={queso} alt="chocolate"/> <span className='font-bold pl-44 text-gray-800'>Queso</span></div>
        
      </div>
    </div>
  );
};

export default Index;
