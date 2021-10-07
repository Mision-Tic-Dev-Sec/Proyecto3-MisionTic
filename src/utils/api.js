import axios from 'axios';

export const obtenerVehiculos = async (setVehiculos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'https://vast-waters-45728.herokuapp.com/vehicle/' };
  await axios
    .request(options)
    .then(function (response) {
      setVehiculos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios/' };
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/ventas/' };
  await axios
    .request(options)
    .then(function (response) {
      setVentas(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/productos/' };
  await axios
    .request(options)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

