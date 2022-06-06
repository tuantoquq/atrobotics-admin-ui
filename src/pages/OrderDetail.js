import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button, CardContent, Container, Grid } from '@mui/material';

export default function OrderDetail() {
  return (
    <Container maxWidth='lg'>
      <Toolbar sx={{ backgroundColor: '#fff' }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
        >
          Order Details
        </Typography>
        <Tooltip title="Filter list">
          <IconButton>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Container maxWidth="xs">
            <Grid container spacing={5}>
              <Grid container item>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Order Code:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  MD001
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    OrderItems:
                  </Typography>                </Grid>
                <Grid item xs={6} sx={{ maxWidth: 180 }}>
                  ProductMD01x1 white,
                  ProductMD01x1 black
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    UserEmail:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  buibatien2408@gmail.com
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Status:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  Accepted
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </CardContent>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Grid item></Grid>
          <Grid item >
            <Button variant="outlined" >Accepted</Button>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}