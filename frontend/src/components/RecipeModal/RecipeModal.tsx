/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dispatch, MouseEvent } from 'react';
import { Recipe } from '../../store/recipe/interfaces/recipe.interface';
import { ingredientsMap } from '../PaginationTable/ingredientsData';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface IRecipeModal {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  recipe: Recipe;
}
export default function RecipeModal({ open, setOpen, recipe }: IRecipeModal) {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
  };
  const { name, ingredients } = recipe;
  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            {name}
          </h2>
          <p
            onClick={(e) => handleClose(e)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            X
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginY: 1,
            }}
          >
            <p style={{ fontWeight: '500' }} id="child-modal-description">
              Ingrediente
            </p>
            <p style={{ fontWeight: '500' }} id="child-modal-description">
              Cantidad
            </p>
          </Box>
          {ingredients.map(
            ({ ingredient: { name: ingredientName }, quantity, _id }) => (
              <Box
                key={_id}
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-around',
                  marginTop: 2,
                }}
              >
                <p style={{ fontWeight: '500' }} id="child-modal-description">
                  {ingredientsMap[ingredientName]}
                </p>
                <p style={{ fontWeight: '400' }}>{quantity}</p>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Modal>
  );
}
