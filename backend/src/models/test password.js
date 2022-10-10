import bcrypt from "bcrypt";

function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

async function validPassword(password) {
    const hash = await generateHash(password);
  return bcrypt.compare(password, hash);
}

console.log(await generateHash("hola"));
console.log(await validPassword("hola"));
