import { ColumnTable } from './PaginationTable';

const orderColums: ColumnTable[] = [
  {
    id: '_id',
    label: 'Id',
  },
  {
    id: 'recipeId.name',
    label: 'Receta',
  },
  {
    id: 'status',
    label: 'Estado',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format: (value: string) => 'SERVIDA',
  },
  {
    id: 'createdAt',
    label: 'Fecha Creación',
    format: (value) => {
      const formatedDate = new Date(value).toLocaleString('es-ES');
      return formatedDate;
    },
  },
];
export default orderColums;
