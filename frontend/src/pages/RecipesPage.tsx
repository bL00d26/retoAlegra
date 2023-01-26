import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../store/store';
import Title from '../components/Title/Title';
import RecipesTable from '../components/PaginationTable/PaginationTableModal';
import { loadRecipesAction } from '../store/recipe/recipe.actions';
import { recipesSelector } from '../store/recipe/recipe.selectors';
import recipeColumns from '../components/PaginationTable/recipesData';

function RecipesPage() {
  const recipes = useSelector(recipesSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadRecipesAction());
  }, [dispatch]);
  return (
    <Box sx={{ paddingX: 10, paddingTop: 2 }}>
      <Box sx={{ marginTop: 5, maxWidth: '100%' }}>
        <Title text="Recetas" />
        <p style={{ fontWeight: '400' }}>
          Hacer click en la receta para ver los ingredientes
        </p>
        <RecipesTable
          columns={recipeColumns}
          itemsArray={recipes}
          emptyMessage="No hay recetas disponibles"
        />
      </Box>
    </Box>
  );
}

export default RecipesPage;
