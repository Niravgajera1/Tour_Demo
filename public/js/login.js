import axios from 'axios'; // Change to import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/login',
      data: {
        email,
        password,
      },
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      document.cookie = `jwt=${res.data.token}; expires=${res.data.expiresIn}; path=/`; // Fix assignment of jwt cookie
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true); // Fix comparison operator
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
