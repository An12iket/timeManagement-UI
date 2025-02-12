import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Time Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;