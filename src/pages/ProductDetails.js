import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  TextField,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ImageList,
  ImageListItem
} from '@mui/material';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { PhotoCamera, Save } from '@mui/icons-material';
import { initProduct } from '../utils/object/productForm';
import { uploadImage, getListCategory, addProduct, getProductById } from '../api/admin';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

function ProductDetails() {
  const initStateProductForm = initProduct('', '', 0, [], [], '', '', '', 0);
  const [productForm, setProductForm] = useState(initStateProductForm);
  const [images, setImages] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const API_URL = 'https://atroboticsvn.com';
  const UPLOAD_ENDPOINT = 'api/v1/admin/auth/file-uploads/single-file';
  const token = Cookies.get('access_token');
  const { productId } = useParams();

  useEffect(() => {

    getListCategory()
      .then((res) => setListCategory(res?.data?.data))
      .catch((err) => {
        console.log(err)
      });

  getProductById(productId)
    .then(result => {
      setProductForm(result.data.data)
    }).catch(err => console.log(err))



  }, []);
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append('image', file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: 'post',
              body: body,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                console.log('Response from server: ', res);
                resolve({
                  default: res.data,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const handleChangeProductName = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      name: data,
    });
  };
  const handleChangeProductPrice = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      price: Number(data),
    });
  };
  const handleChangeProductBrand = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      brand: data,
    });
  };
  const handleChangeProductSold = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      sold: Number(data),
    });
  };
  const handleChangeProductColors = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      color: data.replace(' ', '').split(','),
    });
  };
  const handleChangeProductImages = (event) => {
    let data = event.target.files[0];
    uploadImage(token, data)
      .then((res) => {
        setImages([...images, res?.data?.data]);
        setProductForm({
          ...productForm,
          images: [...images, res?.data?.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeProductShortDesc = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      shortDesc: data,
    });
  };
  const handleChangeProductCategoryId = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      categoryId: data,
    });
  };

  const handleCKeditor = (event, editor) => {
    const data = editor.getData();
    setProductForm({
      ...productForm,
      longDesc: data,
    });
  };

  const handleSubmit = () => {
    addProduct(token, productForm)
    .then(res => {
      console.log(res?.data);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    })
  };
  console.log(productForm);
  return (
    <Page title="Dashboard: Add product">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Update Product Form
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productName"
              label="Product Name"
              placeholder="Enter product name"
              value={productForm.name}
              onChange={handleChangeProductName}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productPrice"
              label="Product Price"
              placeholder="Enter product price"
              value={productForm.price}
              onChange={handleChangeProductPrice}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productBrand"
              label="Product Brand"
              placeholder="Enter product brand"
              value={productForm.brand}
              onChange={handleChangeProductBrand}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productColors"
              label="Product Colors"
              placeholder="Enter product color"
              value={productForm.color}
              onChange={handleChangeProductColors}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productShortDsc"
              label="Product Short Description"
              placeholder="Enter product short description"
              value={productForm.shortDesc}
              onChange={handleChangeProductShortDesc}
              required
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <FormControl fullWidth>
              <InputLabel id="product-category">Product Category</InputLabel>
              <Select
                labelId="product-category"
                value={productForm.categoryId}
                defaultValue=""
                label="Product Category"
                onChange={handleChangeProductCategoryId}
              >
                {listCategory.map((item, id) => {
                  return (
                    <MenuItem key={id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="productSold"
              label="Product Sold"
              placeholder="Enter number of product sold"
              value={productForm.sold}
              onChange={handleChangeProductSold}
              required
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} sx={{ pl: '24px' }}>
            <label htmlFor="contained-button-file-font">
              <Input
                accept="image/*"
                id="contained-button-file-font"
                multiple
                type="file"
                onChange={handleChangeProductImages}
              />
              <Button
                variant="outlined"
                endIcon={<PhotoCamera></PhotoCamera>}
                size="medium"
                component="span"
                color="error"
              >
                Upload Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sx={{ pl: '24px' }}>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {images.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    alt="img"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={12} sx={{ pl: '24px' }}>
            <label>Product Long Description: </label>
            <CKEditor
              id="editor"
              name="productLongDsc"
              editor={ClassicEditor}
              data={productForm.longDesc}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              config={{
                extraPlugins: [uploadPlugin],
              }}
              onChange={handleCKeditor}
            />
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ pr: '24px', mt: '10px' }}>
          <Button
            variant="contained"
            endIcon={<Save></Save>}
            size="medium"
            component="span"
            color="success"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Grid>
      </Container>
    </Page>
  );
}

export default ProductDetails;
