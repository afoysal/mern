import Axios from 'axios';
import Auth from '../../services/Auth';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../services/setAuthToken';
import { getAddress } from '../actions/addressActions';

export const register = ( value, history ) => dispatch =>{
    Axios.post('/api/users/register', value)
    .then( response => {
        dispatch({
            type: 'registration',
            payload: response.data,
            value: 'success'
        });
        history.push('/');
    })
    .catch( error => {
        dispatch({
            type: 'registration',
            payload: error.response.data,
            value: 'error'
        });
    });
}

export const login = ( value, history ) => dispatch => {
    Axios.post('/api/users/login', value)
      .then(response => {
        let token = response.data.token;
        let decode = jwtDecode(token);
        setAuthToken(token);
        Auth.setToken(response.data.token, decode.exp + Date.now());
        dispatch({
          type: 'login',
          payload: decode,
          value: 'success'
        });
        this.props.dispatch(getAddress());
        history.push('/dashboard');
      })
      .catch(error => {
        dispatch({
          type: 'login',
          payload: error.response.data,
          value: 'error'
        });
      });
}

export const logout = history => dispatch => {
    Auth.destroyToken();
    dispatch({ type: 'logout' });
    history.push('/');
};

export default { register, login, logout };
