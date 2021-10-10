import React from 'react';

const Footer = () => {
  return <div className='bg-purple-200'>
    <ul className="flex justify-between font-bold p-3 text-gray-800">
      <li>DevSec 2021 <i class="far fa-copyright"></i></li>
      <li>Telefono: 325478921</li>
      <li>Direccion: cra #12-03</li>
      <li>Colombia</li>
      <li>
        <a href="https://es-la.facebook.com/"><i class="fab fa-facebook px-2"></i></a>
        <a href="https://twitter.com/?lang=es"><i class="fab fa-twitter px-2"></i></a>
        <a href="https://www.instagram.com/?hl=es"><i class="fab fa-instagram px-2"></i></a>
      </li>
    </ul>
  </div>;
};

export default Footer;
