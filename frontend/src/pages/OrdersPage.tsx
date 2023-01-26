import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent, useEffect } from 'react';
import { loadOrdersAction, newOrderAction } from '../store/order/order.actions';
import { AppDispatch } from '../store/store';
import { newOrder, updateOrders } from '../store/order/order.slice';
import { useSocket } from '../hooks/useSocket';
import Title from '../components/Title/Title';
import PendingOrderList from '../components/PendingOrderList/PendingOrderList';
import FinishedOrdersTable from '../components/PaginationTable/PaginationTable';
import finishedOrderColumns from '../components/PaginationTable/finishedOrdersData';
import { finishedOrdersSelector } from '../store/order/order.selectors';

function OrdersPage() {
  const { socket } = useSocket();
  const finishedOrders = useSelector(finishedOrdersSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadOrdersAction());
  }, [dispatch]);
  useEffect(() => {
    socket.connect();
    socket.on('orderUpdate', ({ order }) => {
      dispatch(updateOrders({ order }));
    });
    socket.on('newOrder', ({ order }) => {
      dispatch(newOrder({ order }));
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewOrder = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(newOrderAction());
  };
  return (
    <Box sx={{ paddingX: 10, paddingTop: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000' }}
          onClick={(e) => handleNewOrder(e)}
        >
          Nueva orden
        </Button>
      </Box>

      <Box sx={{ marginTop: 5, maxWidth: '100%' }}>
        <Title text="Órdenes pendientes" />
        <PendingOrderList />
      </Box>
      <Box sx={{ marginTop: 5, maxWidth: '100%' }}>
        <Title text="Órdenes preparadas" />
        <FinishedOrdersTable
          columns={finishedOrderColumns}
          itemsArray={finishedOrders}
          emptyMessage="No hay órdenes preparadas"
        />
      </Box>
    </Box>
  );
}

export default OrdersPage;
