import bcrypt from "bcrypt";

export async function generateHashPassword(password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

export async function verifyPass(username, password) {
  const match = await bcrypt.compare(password, username.password);
  return match;
}
