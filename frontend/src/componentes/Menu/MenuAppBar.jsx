import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import BotonSincronizar from "../Botones/BotonSincronizar";
import { Grid, ListItemIcon } from "@mui/material";
import logoClinishare from "/home/nicole/Escritorio/CliniShare/frontend/src/utilidades/logoCliniShare.png";
import Logout from "@mui/icons-material/Logout";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";

const pages = [];

function MenuAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  return (
    <>
      <Grid item xs={12} container>
        <Grid item xs={4}>
          <Box
            textAlign="left"
            style={{
              width: "1%",
            }}
          >
            <img
              width={150}
              height={45}
              style={{
                marginBottom: 4,
                marginTop: 6,
                marginLeft: 5,
              }}
              src={logoClinishare}
              alt="LogoCliniShare"
            ></img>
          </Box>
        </Grid>
        {/* <Grid item xs={0.4}>
          <Box textAlign="center">
            <MedicalIcon
              style={{
                marginBottom: 10,
                marginTop: 12,
                marginLeft: 10,
                marginRight: 10,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3.6}>
          <Box textAlign="left">
            <Typography
              variant="h6"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              CliniShare
            </Typography>
          </Box>
        </Grid> */}
        <Grid item xs={4}>
          <BotonSincronizar></BotonSincronizar>
        </Grid>

        <Grid item xs={3.5}>
          <Box textAlign="right" style={{ marginRight: 2 }}>
            <Typography
              variant="h5"
              style={{
                fontFamily: "cursive",
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              {usuario.medico.nombre} {usuario.medico.apellido}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={0.5}>
          <Box textAlign="left">
            <Tooltip title="Abrir configuraciones">
              <IconButton onClick={handleOpenUserMenu}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                to={"/ver/perfil"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
              </Link>
              <Link
                to={"/configuracion/cuenta"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  Cuenta
                </MenuItem>
              </Link>
              <Link
                to={"/"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Salir
                </MenuItem>
              </Link>

              {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default MenuAppBar;
