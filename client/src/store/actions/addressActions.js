import Axios from 'axios';
import get from 'lodash/get';

Axios.interceptors.response.use(
  response => response,
  error => {
    const err = get(error, ['response', 'data', 'err']);
    return err ? Promise.reject(err) : Promise.reject(error.message);
  },
);

export const getAddress = (page, userID) => dispatch => {
  return Axios.get('/api/address/page/' + page + '/user_id/' + userID)
  .then(response => {
    var addressData = response.data;
    dispatch({
      type: 'getAddresses',
      payload: addressData
    });
  })
  .catch(function(error) {
    dispatch({
      type: 'getAddressesError',
      payload: error
    });
  });
};

export const addAddress = value => dispatch => {
  return Axios.post('/api/address', value)
  .then(response => {
    dispatch({
      type: 'addAddress',
      payload: response.data
    });
  })
  .catch(error => {
    dispatch({
      type: 'erroraddAddress',
      payload: error
    });
  });
};

export const uploadImage = (formData, config, user_id) => dispatch => {
  return Axios.post('/api/address/upload/' + user_id, formData, config )
  .then(response => {
    //console.log(response);
    dispatch({
      type: 'uploadImage',
      payload: response.data
    });
  })
  .catch(error => {
    //console.log(error);
    dispatch({
      type: 'uploadImageerror',
      payload: error
    });
  });
};

export const openModal = value => dispatch => {
  dispatch({
    type: 'openModal',
    payload: value
  });
};

export const deleteImage = (image_name) => dispatch => {
  if (image_name) {
    return Axios.post('/api/address/cancle_image/' + image_name)
    .then(response => {
      dispatch({
        type: 'deleteImage',
        payload: response.data
      });
    })
    .catch(
      error => { console.log(error) }
    );
  }
};

export default { getAddress, addAddress, uploadImage, openModal };