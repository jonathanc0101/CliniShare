import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import Home from "./Home";

function LoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState({
    nombre: "",
    token: "",
    email: "",
  });
  const [datosValidos, setDatosValidos] = useState(false);

    useEffect(()=> {
        const loggedCliniShareUserJSON = window.localStorage.getItem("loggedCliniShareAppUser")
        if(loggedCliniShareUserJSON){
            const user = JSON.parse(loggedCliniShareUserJSON)
            setUsuario(user);
        }
    },[])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const usuario = await api.login(correoElectronico, password);
      console.log("Object: ",usuario);
      console.log(Object.keys(usuario).length !== 0);
      if (Object.keys(usuario).length !== 0) {
        setDatosValidos(true);
        const usuarioAux = {
          nombre: usuario.medico.nombre,
          token: usuario.token,
          email: usuario.medico.email,
        };

        console.log("Usuario aux: ",usuarioAux);
        window.localStorage.setItem(
          "loggedCliniShareAppUser",
          JSON.stringify(usuarioAux)
        );
        setUsuario(usuarioAux);
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
        <Navigate to="/" />
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AccountCircleIcon />
              </Avatar>
              <h2>Login</h2>
            </Grid>
            <TextField
              type="text"
              label="Correo electrónico"
              placeholder="Ingrese su correo electrónico"
              value={correoElectronico}
              onChange={({ target }) => setCorreoElectronico(target.value)}
              fullWidth
              required
            />
            <br></br>
            <br></br>

            <TextField
              label="Password"
              placeholder="Ingrese su contraseña"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              fullWidth
              required
            />
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
              Login
            </Button>

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
