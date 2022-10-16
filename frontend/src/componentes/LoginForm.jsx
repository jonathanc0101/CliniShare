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
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { api } from "../API backend/api";

function LoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const usuario = await api.login(correoElectronico, password);
      console.log("login?: ", usuario);
      setUsuario(usuario);
      setCorreoElectronico("");
      setPassword("");
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
    </>
  );
}

export default LoginForm;
