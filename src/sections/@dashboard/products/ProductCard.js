import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {

  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/products/${product.id}`);
  }

  return (
    <Card  sx={{cursor: 'pointer'}} onClick={handleClick}>
      <Box sx={{ pt: '100%', position: 'relative' }} >
        <ProductImgStyle alt={product?.name} src={product?.images[0]} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {product?.name}            
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={product?.color} />
          <Typography variant="subtitle1">
            {fCurrency(product?.price)} D
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
