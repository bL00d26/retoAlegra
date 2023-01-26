import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useNavigate } from 'react-router-dom';

export interface ISidebarItem {
  text: string;
  navgigateTo: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

interface SidebarItemProps {
  sidebarItem: ISidebarItem;
}
function SidebarItem({ sidebarItem }: SidebarItemProps) {
  const { text, navgigateTo, Icon } = sidebarItem;
  const navigate = useNavigate();
  const handleNavigation = (url: string) => {
    navigate(url);
  };
  return (
    <ListItemButton onClick={() => handleNavigation(navgigateTo)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        sx={{ display: { xs: 'none', md: 'flex' } }}
        primary={text}
      />
    </ListItemButton>
  );
}

export default SidebarItem;
