import { RecipeIngredient } from '../../store/recipe/interfaces/recipe-ingredient.interface';
import { ColumnTable } from './PaginationTable';

const recipeColumns: ColumnTable[] = [
  {
    id: '_id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Nombre',
  },
  {
    id: 'ingredients',
    label: 'Cantidad de Ingredientes',
    format: (value: RecipeIngredient[]) => {
      const total = value.reduce((acc, { quantity }) => acc + quantity, 0);
      return String(total);
    },
  },
  {
    id: 'ingredients',
    label: 'Total de Ingredientes',
    format: (value: RecipeIngredient[]) => String(value.length),
  },
];

export default recipeColumns;
