import axiosConfig from '../config/axiosConfig';

 /**
   * Login API for user and admin
   * @param {String} email
   * @param {String} password
   * @returns response of API
   */
  export const login = async (email, password) => {
    let response;
    try {
      response = await axiosConfig.post('/user/login', {
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    return response;
  }

  export const getUserProfile= async (token) => {
    let response;
    try {
      response = await axiosConfig.get('/user/auth/info',
      {
          headers: {
            "Authorization": `Bearer ${token}`
          }
      });
    } catch (error) {
      console.log(error);
      return;
    }
    return response;
  }

