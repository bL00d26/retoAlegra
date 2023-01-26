import { ColumnTable } from './PaginationTable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ingredientsMap: any = {
  Tomato: 'Tomate',
  Lemon: 'Limón',
  Potato: 'Papa',
  Rice: 'Arroz',
  Ketchup: 'Ketchup',
  Lettuce: 'Lechuga',
  Onion: 'Cebolla',
  Meat: 'Carne',
  Chicken: 'Pollo',
  Cheese: 'Queso',
};
const ingredientColumns: ColumnTable[] = [
  {
    id: '_id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Nombre',
    format: (value: string) => ingredientsMap[value],
  },
  {
    id: 'stock',
    label: 'Stock',
  },
];

export default ingredientColumns;
