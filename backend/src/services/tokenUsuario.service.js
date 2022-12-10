import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { TokenUsuario } from "../models/TokenUsuario.js";

export const TokenUsuarioService = {
  validarTokenYUsuario,
  nuevoToken,
};

async function nuevoToken(user) {
  const tokenNuevo = { medicoId: user.id };
  try {
    const tokenRecibido = await TokenUsuario.create(tokenNuevo);

    return tokenRecibido;
  } catch (error) {
    console.log("Error en la creación de token nuevo " + error);
  }
}

async function validarTokenYUsuario(token) {
    try {
        
        const tokenEncontrado = await TokenUsuario.findOne({
            where: {
              validoHasta: { [Op.gt]: new Date() },
            },
          });
        
          if (!tokenEncontrado) {
            return {};
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
        
        console.log("error en tokenusuario: " + error);
        return false;
    }
}
