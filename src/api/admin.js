import axiosConfig from '../config/axiosConfig';

export const uploadImage = async (token, file) => {
  let response;
  try {
    let requestBody = new FormData();
    requestBody.append('image', file);
    response = await axiosConfig.post('/admin/auth/file-uploads/single-file', requestBody, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
  return response;
};

export const getListCategory = async () => {
  let response;
  try {
    response = await axiosConfig.get('/user/categories');
  } catch (error) {
    console.log(error);
    return;
  }
  return response;
};

export const getListProduct = async () => {
  let response;
  try{
    response = await axiosConfig.get('/user/products');
  }catch(error){
    console.log(error);
    return;
  }
  return response;
}
export const getListUser = async (token, limit, offset) => {
  let response;
  try{
    response = await axiosConfig.get(`/admin/auth/user/lists?limit=${limit}&offset=${offset}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }catch(error){
    console.log(error);
    return;
  }
  return response;
}

export const addProduct = async (token, productForm) => {
  let response;
  try{
    response = await axiosConfig.post('/admin/auth/products',productForm,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  }catch(error){
    console.log(error);
    return;
  }
  return response;
}
