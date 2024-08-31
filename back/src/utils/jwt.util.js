import pkg from "jsonwebtoken";
const { sign } = pkg;

export function generateToken(payload) {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
