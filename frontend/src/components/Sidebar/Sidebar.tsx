import { Box, List } from '@mui/material';
import { useId } from 'react';
import SidebarItem from './SidebarItem';
import sidebarItems from './sidebar.data';

function Sidebar() {
  const id = useId();
  return (
    <Box bgcolor="#DCDCDC" flex={1} height="100vh">
      <List disablePadding color="white" sx={{ paddingX: 1 }}>
        {sidebarItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SidebarItem key={`${id}-${index}`} sidebarItem={item} />
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
