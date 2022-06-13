// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getListProduct } from '../../../api/admin';

// ----------------------------------------------------------------------



export default function ProductList() {
  const [products, setProducts] = useState()

  useEffect(() => {
    getListProduct()
      .then(result => {
        setProducts(result.data.data.data)
        console.log(result.data.data.data);
      })
      .catch(err => {
        console.log(err)
      })



  }, [])
  return (
    <Grid container spacing={3} >
      {products?.map((product) => {
        return (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        )})}
    </Grid>
  );
}
