import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AppDispatch } from '../store/store';
import Title from '../components/Title/Title';
import { loadIngredientsAction } from '../store/ingredient/ingredient.actions';
import { ingredientsSelector } from '../store/ingredient/ingredient.selectors';
import { updateStockIngredients } from '../store/ingredient/ingredient.slice';
import IngredientsTable from '../components/PaginationTable/PaginationTable';
import ingredientColumns from '../components/PaginationTable/ingredientsData';

function IngredientsPage() {
  const { socket } = useSocket();
  const ingredients = useSelector(ingredientsSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadIngredientsAction());
  }, [dispatch]);
  useEffect(() => {
    socket.connect();
    socket.on('ingredientsUpdate', ({ newIngredientStock }) => {
      dispatch(updateStockIngredients({ newIngredientStock }));
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ paddingX: 10, paddingTop: 2 }}>
      <Box sx={{ marginTop: 5, maxWidth: '100%' }}>
        <Title text="Ingredientes" />
        <IngredientsTable
          columns={ingredientColumns}
          itemsArray={ingredients}
          emptyMessage="No hay ingredientes en la bodega"
        />
      </Box>
    </Box>
  );
}

export default IngredientsPage;
