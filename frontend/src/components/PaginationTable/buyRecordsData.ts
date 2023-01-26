import { Ingredient } from '../../store/ingredient/interfaces/ingredient.interface';
import { ingredientsMap } from './ingredientsData';
import { ColumnTable } from './PaginationTable';

const buyRecordColums: ColumnTable[] = [
  {
    id: '_id',
    label: 'Id',
  },
  {
    id: 'quantitySold',
    label: 'Cantidad Comprada',
    format: (value: number) => String(value),
  },
  {
    id: 'ingredientId',
    label: 'Ingrediente',
    format: ({ name }: Ingredient) => ingredientsMap[name],
  },
  {
    id: 'createdAt',
    label: 'Fecha de la Compra',
    format: (value) => {
      const formatedDate = new Date(value).toLocaleString('es-ES');
      return formatedDate;
    },
  },
];

export default buyRecordColums;
