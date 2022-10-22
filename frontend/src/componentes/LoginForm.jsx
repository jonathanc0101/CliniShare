import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import Home from "./Home";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

function LoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    mostrarPassword: "",
  });
  const [usuario, setUsuario] = useState({
    nombre: "",
    token: "",
    email: "",
  });
  const [datosValidos, setDatosValidos] = useState(false);

  useEffect(() => {
    const loggedCliniShareUserJSON = window.localStorage.getItem(
      "loggedCliniShareAppUser"
    );
    if (loggedCliniShareUserJSON) {
      const user = JSON.parse(loggedCliniShareUserJSON);
      setUsuario(user);
    }
  }, []);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      mostrarPassword: !values.mostrarPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const usuario = await api.login(correoElectronico, password);
      console.log(usuario);
      if (Object.keys(usuario).length !== 0) {
        setDatosValidos(true);
        // const usuarioAux = {
        //   nombre: usuario.medico.nombre,
        //   token: usuario.token,
        //   email: usuario.medico.email,
        // };

        window.localStorage.setItem(
          "loggedCliniShareAppUser",
          JSON.stringify(usuario)
        );
        setUsuario(usuario);
        setCorreoElectronico("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "blue" };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      {datosValidos ? (
        <Navigate to="/home" />
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AccountCircleIcon />
              </Avatar>
              <h2>Login</h2>
            </Grid>

            <InputLabel>Correo electrónico</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              value={correoElectronico}
              onChange={({ target }) => setCorreoElectronico(target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <AlternateEmailIcon></AlternateEmailIcon>
                </InputAdornment>
              }
              placeholder="Correo electrónico"
              required
            />

            <br></br>
            <br></br>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.mostrarPassword ? "text" : "password"}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.mostrarPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Contraseña"
              required
            />
            <br></br>
            <br></br>
            {/* </FormControl> */}

            {/* Recordar contraseña */}
            {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              onClick={handleLogin}
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              INICIAR SESIÓN
            </Button>

            <br></br>
            <Link to={"/register"}>
              <Button
                color="secondary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                REGISTRARSE
              </Button>
            </Link>
            {/* <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography> */}
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default LoginForm;
