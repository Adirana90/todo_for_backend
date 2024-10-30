import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isCompared = await bcrypt.compare(password, hashedPassword);
  return isCompared;
}
