import Axios from 'axios';

export const getAddress = () => dispatch => {
    //Axios.get('/api/users/addresses?page=' + this.state.page )
  return Axios.get('/api/address')
  .then(response => {
    //console.log(response.data);
    // self.setState({
    //     result: response.data.data,
    //     last_page: response.data.meta.last_page,
    //     current_page: response.data.meta.current_page,
    //     from: response.data.meta.from,
    //     dataAvailable: true
    // });
    dispatch({
      type: 'getAddresses',
      payload: response.data
    });
  })
  .catch(function(error) {
    console.log(error);
  });
}

export default { getAddress };