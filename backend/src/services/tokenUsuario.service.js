import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { TokenUsuario } from "../models/TokenUsuario.js";

export const TokenUsuarioService = {
  validarTokenYUsuario,
  nuevoToken,
};

async function nuevoToken(user,transaction) {
  console.log("user: ", JSON.stringify(user, null, 20));

  const tokenNuevo = { medicoId: user.id };
  try {
    const tokenRecibido = await TokenUsuario.create(tokenNuevo,{transaction});

    return tokenRecibido;
  } catch (error) {
    console.log("Error en la creación de token nuevo (nuevoToken) " + error);
  }
}

async function validarTokenYUsuario(token) {
  try {
    const tokenEncontrado = await TokenUsuario.findOne({
      where: {
        validoHasta: { [Op.gt]: new Date() },
        id: token.id,
      },
    });

    if (!tokenEncontrado) {
      return false;
    } else {
      const userEncontrado = await MedicoUsuario.findOne({
        where: { id: tokenEncontrado.medicoId },
      });

      await sequelize.transaction(async (t) => {
        userEncontrado.verificado = true;
        userEncontrado.update({
          transaction: t,
        });

        tokenEncontrado.destroy();
      });

      return true;
    }
  } catch (error) {
    console.log("error en validarTokenYUsuario: " + error);
    return false;
  }
}
