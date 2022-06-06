import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Card, CardContent, FormControl, InputAdornment, InputLabel, MenuItem, Select, SvgIcon, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const rows = [{
  id: 1,
  name: 'MD001',
  email: 'lotuscos@way.com',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: 'Waiting ',
}, {
  id: 2,
  name: 'MD002',
  email: 'diamend@open.com',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: 'Accepted ',

}, {
  id: 3,
  name: 'MD003',
  email: 'rickkid@devias.io',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: '	Finished ',
},
{
  id: 4,
  name: 'MD004',
  email: 'rickkid@devias.io',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: 'Waiting',
},
{
  id: 5,
  name: 'MD005',
  email: 'rickkid@devias.io',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: '	Finished ',
},
{
  id: 6,
  name: 'MD006',
  email: 'rickkid@devias.io',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: '	Accepted ',
},
{
  id: 7,
  name: 'MD007',
  email: 'rickkid@devias.io',
  items: 'ProductMD01x1 white, ProductMD01x1 black',
  status: '	Waiting ',
}
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'ordercode',
    disablePadding: true,
    label: 'OrderCode',
  },
  {
    id: 'useremail',
    disablePadding: false,
    label: 'User_Email',
  },
  {
    id: 'orderitems',
    disablePadding: false,
    label: 'OrderItems',
  },
  {
    id: 'orderstatus',
    disablePadding: false,
    label: ' OrderStatus',
  },

];

function BasicTable(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell >
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

BasicTable.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function OrderResult() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ maxWidth: 500, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
            >
              <MenuItem value={10}>Waiting</MenuItem>
              <MenuItem value={20}>Accepted</MenuItem>
              <MenuItem value={30}>Finsished</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    color="action"
                    fontSize="small"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="Search customer"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <Toolbar sx={{ backgroundColor: '#fff' }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h4"
        >
          Order List
        </Typography>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size='medium'
          >
            <BasicTable
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      sx={{ cursor: 'pointer' }}
                      onDoubleClick={(e) => {
                        navigate('/dashboard/order-details', { replace: true })
                      }}
                      key={row.id}
                    >
                      <TableCell >
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell >{row.email}</TableCell>
                      <TableCell sx={{ maxWidth: 150 }}>{row.items}</TableCell>
                      <TableCell >
                        <Button variant="outlined">{row.status}</Button>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 80 }}
                      >
                        <div style={{ display: 'flex', gap: '20px' }}>
                          <EditIcon sx={{ fontSize: '20px' }} onClick={(e) => {
                            alert('Edit Selected')
                          }} />
                          <DeleteIcon sx={{ fontSize: '20px' }} color="error" onClick={(e) => {
                            alert('Delete Selected')
                          }} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Card>
  );
}