import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { ISidebarItem } from './SidebarItem';

const sidebarItems: ISidebarItem[] = [
  {
    text: 'Órdenes',
    Icon: FastfoodIcon,
    navgigateTo: '/orders',
  },
  {
    text: 'Recetas',
    Icon: RestaurantIcon,
    navgigateTo: '/recipes',
  },
  {
    text: 'Ingredientes',
    Icon: LunchDiningIcon,
    navgigateTo: '/ingredients',
  },
  {
    text: 'Historial',
    Icon: MenuBookIcon,
    navgigateTo: '/buy-records',
  },
];
export default sidebarItems;
