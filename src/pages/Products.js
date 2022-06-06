import { useState } from 'react';
// material
import { Container, Stack, Typography, Box, Button, Grid } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/Iconify';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleAddProduct = ()=>{
    navigate('/dashboard/manage-product',{ replace: true });
  }

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sx={{pl:'24px'}}>
            <Stack direction="row" alignItems="center" spacing={3} justifyContent="flex-start" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Button startIcon={<Iconify icon={'akar-icons:plus'}/>} onClick={handleAddProduct} variant="outlined">Add Product</Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductFilterSidebar
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ProductSort />
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
