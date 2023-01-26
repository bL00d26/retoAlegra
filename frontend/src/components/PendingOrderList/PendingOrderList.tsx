import { Box, ImageList, ImageListItem, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { pendingOrdersSelector } from '../../store/order/order.selectors';
import PreparedOrderListItem from './PendingOrderListItem';

function PreparedOrderList() {
  const pendingOrders = useSelector(pendingOrdersSelector);
  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {pendingOrders?.length ? (
        <ImageList
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns:
              'repeat(auto-fill,minmax(200px,1fr)) !important',
            gridAutoColumns: 'minmax(200px, 1fr)',
          }}
        >
          {pendingOrders.map((order) => (
            // eslint-disable-next-line no-underscore-dangle
            <ImageListItem key={order._id}>
              <PreparedOrderListItem order={order} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Paper
          sx={{
            width: '100%',
            marginTop: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            No hay órdenes pendientes
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default PreparedOrderList;
