import { Container, Typography, Grid } from '@mui/material';
import OrderResult from '../components/order/OrderResult';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Order() {

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
        Order  Manage
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ pl: '24px' }}>
          <OrderResult/>      
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
