import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Box, Button } from '@mui/material';
import { Order } from '../../store/order/interfaces/order.interface';
import { Recipe } from '../../store/recipe/interfaces/recipe.interface';

interface IPreparedOrderListItem {
  order: Order;
}
export default function PreparedOrderListItem({
  order,
}: IPreparedOrderListItem) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, recipeId: recipe, createdAt } = order;
  const { name = '' } = recipe as Recipe;
  const shortId = _id.substring(_id.length / 2, _id.length);
  const formatedDate = new Date(createdAt).toLocaleString('es-ES');
  return (
    <Card
      sx={{
        width: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 1,
      }}
    >
      <Box>
        <CardHeader title={name} subheader={shortId} />
        <Typography component="p" sx={{ textAlign: 'center' }}>
          {formatedDate}
        </Typography>
      </Box>

      <Button variant="contained" color="error">
        PENDIENTE
      </Button>
    </Card>
  );
}
