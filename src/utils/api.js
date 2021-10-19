import axios from 'axios';

const baseURL = "https://afternoon-depths-48666.herokuapp.com"

const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

export const obtenerVehiculos = async (setVehiculos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: `${baseURL}/vehiculos/` };
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

//USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET', 
  url: `${baseURL}/usuarios/`,
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = { method: 'GET', 
  url: `${baseURL}/usuarios/self/`,
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearUsuario = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/usuarios/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuario = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${baseURL}/usuarios/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback)};

  export const eliminarUsuario = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'DELETE',
      url: `${baseURL}/usuarios/${id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

//VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
  const options = { method: 'GET', 
  url: `${baseURL}/ventas/`,
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/ventas/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${baseURL}/ventas/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback)};

  export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'DELETE',
      url: `${baseURL}/ventas/${id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

//PRODUCTOS

export const obtenerProductos = async (successCallback, errorCallback) => {
  const options = { method: 'GET', 
  url: `${baseURL}/productos/`,
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearProductos = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/productos/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarProducto = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${baseURL}/productos/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback)};

  export const eliminarProducto = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'DELETE',
      url: `${baseURL}/productos/${id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };
