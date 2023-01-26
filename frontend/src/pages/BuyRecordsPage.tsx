import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AppDispatch } from '../store/store';
import Title from '../components/Title/Title';
import BuyRecordsTable from '../components/PaginationTable/PaginationTable';
import { buyRecordsSelector } from '../store/ingredient/ingredient.selectors';
import { loadBuyRecordsAction } from '../store/ingredient/ingredient.actions';
import { updateBuyRecords } from '../store/ingredient/ingredient.slice';
import buyRecordColums from '../components/PaginationTable/buyRecordsData';

function BuyRecordsPage() {
  const { socket } = useSocket();
  const buyRecords = useSelector(buyRecordsSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadBuyRecordsAction());
  }, [dispatch]);
  useEffect(() => {
    socket.connect();
    socket.on('newBuyRecords', ({ newBuyRecords }) => {
      dispatch(updateBuyRecords({ newBuyRecords }));
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ paddingX: 10, paddingTop: 2 }}>
      <Box sx={{ marginTop: 5, maxWidth: '100%' }}>
        <Title text="Historial de Compras a la Plaza" />
        <BuyRecordsTable
          columns={buyRecordColums}
          itemsArray={buyRecords}
          emptyMessage="No hay registros de Compras a la Plaza"
        />
      </Box>
    </Box>
  );
}

export default BuyRecordsPage;
