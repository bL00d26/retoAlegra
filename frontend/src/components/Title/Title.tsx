import { Typography } from '@mui/material';

function Title({ text }: { text: string }) {
  return (
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        display: 'flex',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {text}
    </Typography>
  );
}

export default Title;
